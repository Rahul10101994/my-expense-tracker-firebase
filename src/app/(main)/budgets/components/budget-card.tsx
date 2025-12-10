import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import type { Budget } from "@/lib/types";
import { cn } from "@/lib/utils";

export function BudgetCard({ budget }: { budget: Budget }) {
  const { name, amount, spent, icon: Icon } = budget;
  const remaining = amount - spent;
  const progress = (spent / amount) * 100;

  const getProgressColor = () => {
    if (progress > 90) return "bg-red-500";
    if (progress > 75) return "bg-yellow-500";
    return "bg-primary";
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{name}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">${amount.toLocaleString()}</div>
        <p className="text-xs text-muted-foreground">Budgeted</p>
        <Progress value={progress} className="mt-4" indicatorClassName={cn(getProgressColor())} />
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <span className="text-muted-foreground">Spent</span>
        <span>${spent.toLocaleString()}</span>
      </CardFooter>
      <CardFooter className="flex justify-between text-sm pt-0">
         <span className="text-muted-foreground">Remaining</span>
         <span className={cn(remaining < 0 ? "text-red-500" : "text-green-600")}>
           ${remaining.toLocaleString()}
         </span>
      </CardFooter>
    </Card>
  );
}
