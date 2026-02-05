import { Code2Icon, LoaderIcon, PlusIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

function CreateSessionModal({  isOpen,onClose,roomConfig,setRoomConfig,onCreateRoom,isCreating}) {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div className="modal modal-open px-2 sm:px-0">
      <div className="modal-box  w-full max-w-lg sm:max-w-2xl p-4 sm:p-6">
        <h3 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">Create New Session</h3>

        <div className="space-y-6 sm:space-y-8">
          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="label flex flex-wrap gap-1">
              <span className="label-text font-semibold">Select Problem</span>
              <span className="label-text-alt text-error">*</span>
            </label>

            <select
              className="select w-full text-sm sm:text-base"
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find((p) => p.title === e.target.value);
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Choose a coding problem...
              </option>

              {problems.map((problem) => (
                <option key={problem.id} value={problem.title}>
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* ROOM SUMMARY */}
          {roomConfig.problem && (
            <div className="alert alert-success flex flex-col sm:flex-row gap-3">
              <Code2Icon className="size-5" />
              <div className="text-sm sm:text-base">
                <p className="font-semibold">Room Summary:</p>
                <p>
                  Problem: <span className="font-medium">{roomConfig.problem}</span>
                </p>
                <p>
                  Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="modal-action  flex flex-col sm:flex-row gap-3 sm:gap-2">
          <button className="btn btn-ghost w-full sm:w-auto" onClick={onClose}>
            Cancel
          </button>

          <button
            className="btn btn-primary gap-2 w-full sm:w-auto"
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
          >
            {isCreating ? (
              <LoaderIcon className="size-5 animate-spin" />
            ) : (
              <PlusIcon className="size-5" />
            )}

            {isCreating ? "Creating..." : "Create"}
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose}></div>
    </div>
  );
}
export default CreateSessionModal;