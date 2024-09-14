import { CreateGoal } from "./components/createGoal";
import { Summary } from "./components/summary";
// import { EmptyGoals } from "./components/emptyGoals";
import { Dialog } from "./components/ui/dialog";

export const App = () => {
  return (
    <Dialog>
      {/* <EmptyGoals /> */}
      <Summary />
      <CreateGoal />
    </Dialog>
  );
};
