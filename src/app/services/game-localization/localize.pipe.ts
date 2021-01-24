import { Pipe, PipeTransform } from "@angular/core";
import { LocalizationService } from "./localization.service";


@Pipe({
    name: 'localize'
})
export class LocalizePipe implements PipeTransform {

    constructor(private readonly localizationService: LocalizationService) {
    }

    public transform(value: any, ...args: any[]) {
        let translation = this.getTranslation(value, args);

        for (let index = 1; index < args.length; index++) {
            translation = translation.replace(new RegExp(`\\{${index - 1}\\}`, 'g'), args[index]);
        }
        return translation;
    }

    private getTranslation(value: string, args: any[]): string {
        const translation = this.localizationService.translate(value);
        if (translation == null && args.length >= 1) {
            return args[0];
        }

        return translation ?? '';
    }
}
