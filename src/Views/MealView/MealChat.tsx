import { useEffect, useRef, KeyboardEvent } from "react";
import { getCookieData } from "Utilities/cookieParser";
import {
  MEAL_NAME_MUTATION,
  MEAL_EDIT_MUTATION,
  MEAL_DELETE,
} from "Schema/mutations/meal.mutations";
import useMutation from "Hooks/useMutation";
import useState from "Hooks/useState";
import Button from "Components/Button";
import styles from "./MealChat.module.css";

// A write the assistant wants to make — mirrors the server's MealProposal.
// Nothing is written until the user confirms it here.
interface Proposal {
  action: "create" | "edit" | "delete";
  name?: string;
  ingredients?: { name: string }[];
  instructions?: string;
  id?: string;
}

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

interface ChatResponse {
  status: string;
  reply: string;
  proposals: Proposal[];
  // Opaque Anthropic message history — echoed back to continue the conversation.
  messages: unknown[];
}

interface Props {
  // Refresh the meal list after a confirmed create/delete.
  onMutation: () => void;
}

interface State {
  open: boolean;
  input: string;
  loading: boolean;
  error: string | null;
  display: ChatMessage[];
  serverMessages: unknown[];
  proposals: Proposal[];
}

const CHAT_URL = import.meta.env.VITE_CLIENT_MEAL_CHAT_LINK;

const MealChat = ({ onMutation }: Props) => {
  const [state, setState] = useState<State>({
    open: false,
    input: "",
    loading: false,
    error: null,
    display: [],
    serverMessages: [],
    proposals: [],
  });

  const [createMeal] = useMutation(MEAL_NAME_MUTATION);
  const [editMeal] = useMutation(MEAL_EDIT_MUTATION);
  const [deleteMeal] = useMutation(MEAL_DELETE);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [state.display, state.proposals, state.loading]);

  const send = async () => {
    const text = state.input.trim();
    if (!text || state.loading) return;

    const nextServerMessages = [
      ...state.serverMessages,
      { role: "user", content: text },
    ];

    setState({
      input: "",
      loading: true,
      error: null,
      display: [...state.display, { role: "user", text }],
      serverMessages: nextServerMessages,
    });

    try {
      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getCookieData("auth")}`,
        },
        body: JSON.stringify({ messages: nextServerMessages }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.message || `Request failed (${response.status})`
        );
      }

      const data: ChatResponse = await response.json();

      setState({
        loading: false,
        display: [
          ...state.display,
          { role: "user", text },
          { role: "assistant", text: data.reply },
        ],
        serverMessages: data.messages,
        proposals: data.proposals || [],
      });
    } catch (error: any) {
      setState({
        loading: false,
        error: error?.message || "Something went wrong.",
      });
    }
  };

  // Execute a confirmed proposal via the existing GraphQL mutations, then
  // refresh the list and drop it from the pending list.
  const confirmProposal = async (proposal: Proposal, index: number) => {
    try {
      if (proposal.action === "create") {
        await createMeal({
          variables: {
            name: proposal.name,
            ingredients: proposal.ingredients,
            instructions: proposal.instructions,
          },
        });
      } else if (proposal.action === "edit") {
        await editMeal({
          variables: {
            id: proposal.id,
            name: proposal.name,
            ingredients: proposal.ingredients,
            instructions: proposal.instructions,
          },
        });
      } else {
        await deleteMeal({ variables: { id: proposal.id } });
      }
      onMutation();
      dismissProposal(index);
    } catch (error: any) {
      setState({ error: error?.message || "Could not apply the change." });
    }
  };

  const dismissProposal = (index: number) => {
    setState({
      proposals: state.proposals.filter((_, i) => i !== index),
    });
  };

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send();
    }
  };

  return (
    <>
      {/* Toggle button — stacked above the Add FAB (bottom-right); z-50 keeps
          it above the fixed left sidebar / layout chrome. */}
      <button
        aria-label="Open meal assistant"
        className="fixed bottom-24 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-text-inv shadow-lg transition-transform hover:scale-110 md:bottom-32 md:right-12"
        onClick={() => setState({ open: !state.open })}
      >
        <span className="text-xl">{state.open ? "✕" : "💬"}</span>
      </button>

      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full flex-col border-l border-border bg-surface shadow-2xl transition-transform duration-200 sm:w-96 ${
          state.open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border px-4 py-3">
          <h3 className="text-lg font-bold text-text">Meal assistant</h3>
          <button
            aria-label="Close"
            className="text-text-muted hover:text-text"
            onClick={() => setState({ open: false })}
          >
            ✕
          </button>
        </header>

        <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-4">
          {!state.display.length && (
            <p className="text-sm text-text-muted">
              Ask me about your meals — e.g. “which meals are vegetarian?”, or
              “make a meal from this recipe URL”.
            </p>
          )}

          {state.display.map((message, index) => (
            <div
              key={index}
              className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                message.role === "user"
                  ? "ml-auto bg-secondary text-text-inv"
                  : "bg-surface-alt text-text"
              }`}
            >
              {message.text}
            </div>
          ))}

          {state.loading && (
            <div className="max-w-[85%] rounded-2xl bg-surface-alt px-3 py-2 text-sm text-text-muted">
              Thinking…
            </div>
          )}

          {state.proposals.map((proposal, index) => (
            <div
              key={index}
              className="rounded-xl border border-border bg-surface-alt p-3 text-sm"
            >
              <p className="font-semibold text-text">
                {proposal.action === "create" && `Create “${proposal.name}”?`}
                {proposal.action === "edit" && `Update “${proposal.name}”?`}
                {proposal.action === "delete" && `Delete “${proposal.name}”?`}
              </p>
              {proposal.action !== "delete" &&
                !!proposal.ingredients?.length && (
                  <p className="mt-1 text-text-muted">
                    {proposal.ingredients.map((i) => i.name).join(", ")}
                  </p>
                )}
              <div className="mt-2 flex gap-2">
                <Button
                  className="px-3 py-1.5 text-xs"
                  onClick={() => confirmProposal(proposal, index)}
                >
                  Confirm
                </Button>
                <Button
                  buttonStyle="hollow"
                  className="px-3 py-1.5 text-xs"
                  onClick={() => dismissProposal(index)}
                >
                  Dismiss
                </Button>
              </div>
            </div>
          ))}

          {state.error && (
            <p className="text-sm text-danger-strong">{state.error}</p>
          )}
        </div>

        <div className="flex items-end gap-2 border-t border-border p-3">
          <div
            data-value={state.input}
            className={`${styles.grow} w-full rounded-lg border border-border bg-surface text-sm leading-relaxed text-text transition-colors focus-within:border-secondary focus-within:ring-2 focus-within:ring-secondary/30`}
          >
            <textarea
              rows={1}
              value={state.input}
              placeholder="Ask about your meals…"
              className={`${styles.textarea} placeholder:text-text-muted`}
              onChange={(event) => setState({ input: event.target.value })}
              onKeyDown={onKeyDown}
            />
          </div>
          <Button
            className="shrink-0 px-4 py-2"
            isDisabled={!state.input.trim()}
            isLoading={state.loading}
            onClick={send}
          >
            Send
          </Button>
        </div>
      </aside>
    </>
  );
};

export default MealChat;
