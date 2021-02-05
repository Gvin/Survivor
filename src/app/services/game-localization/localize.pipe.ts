import { Pipe, PipeTransform } from "@angular/core";
import { LocaleNamespace, LocalizationService } from "./localization.service";


@Pipe({
    name: 'localize'
})
export class LocalizePipe implements PipeTransform {

    constructor(private readonly localizationService: LocalizationService) {
    }

    public transform(value: any, ...args: any[]) {
        return this.getTranslation(value, args);
    }

    private getTranslation(value: string, args: string[]): string {
        const translation = this.localizationService.translate(value, LocaleNamespace.default, args.slice(1));
        if (translation == null && args.length >= 1) {
            return args[0];
        }

        return translation ?? '';
    }
}
