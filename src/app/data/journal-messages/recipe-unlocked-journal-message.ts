import { LocaleNamespace } from "src/app/services/game-localization/localization.service";
import { GameItem } from "../items/game-item";
import { LocalizableString } from "../localizable-string";
import { GameRecipeMemento } from "../mementos/game-recipe-memento";
import { GameJournalMessage } from "./game-journal-message";

export class RecipeUnlockedJournalMessage implements GameJournalMessage {
    public constructor(private readonly recipe: GameRecipeMemento) {
    }

    public getMessageString(): LocalizableString {
        return new LocalizableString().addLocalizableComposite('recipe-unlocked', LocaleNamespace.journal, [GameItem.getUseName(this.recipe.outputItemId)]);
    }
}
