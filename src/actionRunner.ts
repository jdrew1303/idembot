import { ActionExecuteInfo, IAction, IActionImplementation } from "./action";
import { ParsedCommandLineOptions } from "./options";

export function addAction(action: IAction): IAction {
    currentActionList.push(action);
    return action;
}

const currentActionList: IAction[] = [];

export async function runActions(info: ActionExecuteInfo, opts: ParsedCommandLineOptions): Promise<void> {
    while (currentActionList.length > 0) {
        const next = currentActionList.shift()! as IActionImplementation;
        console.log(`Execute action: ${next.summary} ${opts.dry ? "(dry)" : ""}`);
        if (opts.dry) {
            // Dry run, do nothing
            continue;
        }
        await next.execute(info);
    }
}
