import { LocaleNamespace } from "src/app/services/game-localization/localization.service";

export interface LocalizableStringPart {
    shouldLocalize: boolean;
    data: string;
    namespace?: LocaleNamespace;
    args?: LocalizableString[];
}

export class LocalizableString {
    private parts: LocalizableStringPart[] = [];

    public get Parts(): LocalizableStringPart[] {
        return this.parts;
    }

    public addStatic(text: string): LocalizableString {
        this.parts.push({
            shouldLocalize: false, 
            data: text
        });
        return this;
    }

    public addLocalizable(key: string, namespace?: LocaleNamespace, args?: string[]) {
        this.parts.push({
            shouldLocalize: true,
            data: key,
            namespace: namespace,
            args: args?.map(arg => new LocalizableString().addStatic(arg))
        });
        return this;
    }

    public addLocalizableComposite(key: string, namespace?: LocaleNamespace, args?: LocalizableString[]) {
        this.parts.push({
            shouldLocalize: true,
            data: key,
            namespace: namespace,
            args: args
        });
        return this;
    }

    public addSubstring(substring: LocalizableString): LocalizableString {
        substring.Parts.forEach(part => {
            this.parts.push(part);
        });
        return this;
    }
}
