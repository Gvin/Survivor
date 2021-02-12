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
        const defaultTranslation = args.length >= 1 ? args[0] : null;
        const translation = this.localizationService.translate(value, LocaleNamespace.common, defaultTranslation, args.slice(1));
        return translation ?? '';
    }
}
