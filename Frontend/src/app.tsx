import { CreateGoal } from "./components/createGoal";
import { EmptyGoals } from "./components/emptyGoals";
import { Summary } from "./components/summary";
import { Dialog } from "./components/ui/dialog";
import { useSummary } from "./hooks/useSummary";

export const App = () => {
  const { data: summary } = useSummary();
  return (
    <Dialog>
      {summary && summary.total > 0 ? <Summary /> : <EmptyGoals />}
      <CreateGoal />
    </Dialog>
  ); 
};
