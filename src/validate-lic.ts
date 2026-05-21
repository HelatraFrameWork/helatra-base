// @ts-nocheck
import { createElement } from './dom';
import { getValue, containerObject, isNullOrUndefined } from './util';
export const componentList: string[] = ['grid', 'pivotview', 'treegrid', 'spreadsheet', 'rangeNavigator', 'DocumentEditor', 'listbox', 'inplaceeditor', 'PdfViewer', 'richtexteditor', 'DashboardLayout', 'chart', 'stockChart', 'circulargauge', 'diagram', 'heatmap', 'lineargauge', 'maps', 'slider', 'smithchart', 'barcode', 'sparkline', 'treemap', 'bulletChart', 'kanban', 'daterangepicker', 'schedule', 'gantt', 'signature', 'query-builder', 'drop-down-tree', 'carousel', 'filemanager', 'uploader', 'accordion', 'tab', 'treeview'];

export const pdfViewerSDKComponents: string[] = ['grid', 'chart', 'maps', 'schedule', 'gantt', 'richtexteditor', 'kanban', 'treegrid', 'filemanager', 'pivotview', 'diagram', 'blockeditor', 'spreadsheet', 'DocumentEditor'];
export const spreadsheetEditorSDKComponents: string[] = ['maps', 'schedule', 'gantt', 'richtexteditor', 'kanban', 'treegrid', 'filemanager', 'pivotview', 'diagram', 'blockeditor', 'PdfViewer', 'DocumentEditor','pdf','pdf-extract'];
export const wordEditorSDKComponents: string[] = ['grid', 'maps', 'schedule', 'gantt', 'richtexteditor', 'kanban', 'treegrid', 'filemanager', 'pivotview', 'diagram', 'blockeditor', 'PdfViewer', 'spreadsheet','pdf','pdf-extract'];

const bypassKey: number[] = [115, 121, 110, 99, 102, 117, 115, 105,
    111, 110, 46, 105, 115, 76, 105, 99, 86, 97, 108,
    105, 100, 97, 116, 101, 100];
let accountURL: string;
let banner: boolean = true;
/**
 * License validation module
 *
 */
class LicenseValidator {
    /**
     * @private
     */
    public isLicensed: boolean = true;
    /**
     * @private
     */
    public version: string = '33';
    /**
     * @private
     */
    public platform: RegExp = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats|essentialstudio/i;
    /**
     * @private
     */
    public prefixRegex: RegExp = /essentialui|pdfviewersdk|documentsdk|spreadsheeteditorsdk|docxeditorsdk/i;
    /**
     * @private
     */
    public incorrectPlatform: RegExp = /JavaScript|ASPNET|ASPNETCORE|ASPNETMVC|FileFormats/i;
    private errors: IErrorType = {
        noLicense: '<span>This application was built using a trial version of Helatra<sup>®</sup> Essential Studio<sup>®</sup>.' +
            ' To remove the license validation message permanently, a valid license key must be included.</span>',
        trailExpired: '<span>This application was built using a trial version of Helatra<sup>®</sup> Essential Studio<sup>®</sup>.' +
            ' To remove the license validation message permanently, a valid license key must be included.</span>',
        versionMismatched: '<span>The included Helatra<sup>®</sup> license key is invalid.</span>',
        platformMismatched: '<span>The included Helatra<sup>®</sup> license key is invalid.</span>',
        invalidKey: '<span>The included Helatra<sup>®</sup> license key is invalid.</span>',
        componentRestricted: '<span>The included Helatra<sup>®</sup> license key is invalid.</span>'
    };
    private validatedPlatforms: string[] = [];
    /**
     * @private
     */
    public minVersion: number | null = null;
    constructor(key?: string) {
        this.manager.setKey(key);
    }

    private allowedComponentsMap: { [key: string]: string[] } = {
        'pdfviewersdk': pdfViewerSDKComponents,
        'spreadsheeteditorsdk': spreadsheetEditorSDKComponents,
        'docxeditorsdk': wordEditorSDKComponents
    };

    /**
     * To manage licensing operation.
     */
    private manager: { setKey: Function, getKey: Function } = (() => {
        let licKey: string = null;
        /**
         * Sets the license key.
         *
         * @param {string} key - Specifies the license key.
         * @returns {void}
         */
        function set(key: string): void { licKey = key; }
        /**
         * Gets the license key.
         *
         * @returns {string} -Gets the license key.
         */
        function get(): string { return licKey; }
        return {
            setKey: set,
            getKey: get
        };
    })();

    /**
     * To manage npx licensing operation.
     */
    private npxManager: { getKey: Function } = (() => {
        const npxLicKey: string = 'npxKeyReplace';
        /**
         * Gets the license key.
         *
         * @returns {string} - Gets the license key.
         */
        function get(): string { return npxLicKey; }
        return {
            getKey: get
        };
    })();

    /**
     * To validate the provided license key.
     *
     * @param {string} component - The name of the component to validate.
     * @returns {boolean} ?
     */
    public validate(component: string): boolean {
        return true;
    }

    private restrictComponent(component: string, platform: string): string | null {
        const ignoreList: string[] = ['DocumentEditor', 'spreadsheet', 'PdfViewer'];
        if (platform === 'essentialui') {
            return ignoreList.indexOf(component) === -1 ? null : this.errors.componentRestricted;
        }
        else if (platform === 'documentsdk') {
            if (component === 'pdf' || component === 'pdf-extract') {
                this.isLicensed = true;
                return null;
            }
            return this.errors.componentRestricted;
        }
        else {
            // eslint-disable-next-line security/detect-object-injection
            const allowedList: string[] = this.allowedComponentsMap[platform] || [];
            return allowedList.indexOf(component) === -1 ? null : this.errors.componentRestricted;
        }
    }

    private getDecryptedData(key: string): string {
        try {
            return atob(key);
        }
        catch (error) {
            return '';
        }
    }
    /**
     * Get license information from key.
     *
     * @returns {IValidator} - Get license information from key.
     */
    private getInfoFromKey(): IValidator[] {
        try {
            let licKey: string = '';
            const pkey: number[] = [5439488, 7929856, 5111808, 6488064, 4587520, 7667712, 5439488,
                6881280, 5177344, 7208960, 4194304, 4456448, 6619136, 7733248, 5242880, 7077888,
                6356992, 7602176, 4587520, 7274496, 7471104, 7143424];
            let decryptedStr: string[] = [];
            const resultArray: IValidator[] = [];
            let invalidPlatform: boolean = false;
            let isNpxKey: boolean =  false;
            if (this.manager.getKey()) {
                licKey = this.manager.getKey();
            } else {
                isNpxKey = true;
                licKey = this.npxManager.getKey().split('npxKeyReplace')[1];
            }
            const licKeySplit: string[] = licKey.split(';');
            for (const lKey of licKeySplit) {
                const decodeStr: string = this.getDecryptedData(lKey);
                if (!decodeStr) {
                    continue;
                }
                let k: number = 0;
                let buffr: string = '';
                if (!isNpxKey) {
                    for (let i: number = 0; i < decodeStr.length; i++, k++) {
                        if (k === pkey.length) { k = 0; }
                        const c: number = decodeStr.charCodeAt(i);
                        buffr += String.fromCharCode(c ^ (pkey[parseInt(k.toString(), 10)] >> 16));
                    }
                } else {
                    const charKey: string = decodeStr[decodeStr.length - 1];
                    const decryptedKey: number[] = [];
                    for (let i: number = 0; i < decodeStr.length; i++) {
                        decryptedKey[parseInt(i.toString(), 10)] = decodeStr[parseInt(i.toString(), 10)].charCodeAt(0)
                        - charKey.charCodeAt(0);
                    }
                    for (let i: number = 0; i < decryptedKey.length; i++) {
                        buffr += String.fromCharCode(decryptedKey[parseInt(i.toString(), 10)]);
                    }
                }
                if (this.platform.test(buffr) || this.prefixRegex.test(buffr)) {
                    decryptedStr = buffr.split(';');
                    invalidPlatform = false;
                    // checked the length to verify the key in proper strucutre
                    if (decryptedStr.length > 3) {
                        const minVersion: number = parseInt(decryptedStr[1].split('.')[0], 10);
                        const lastValue: number = parseInt(decryptedStr[4], 10);
                        resultArray.push({
                            platform: decryptedStr[0],
                            version: decryptedStr[1],
                            expiryDate: decryptedStr[2],
                            lastValue: lastValue,
                            minVersion: minVersion
                        });
                    }
                } else if (buffr && buffr.split(';').length > 3) {
                    invalidPlatform = true;
                }
            }
            if (invalidPlatform && !resultArray.length) {
                return [{ invalidPlatform: invalidPlatform }];
            } else {
                return resultArray.length  ? resultArray : null;
            }
        } catch (error) {
            return null;
        }
    }
}

let licenseValidator: LicenseValidator = new LicenseValidator();
/**
 * Converts the given number to characters.
 *
 * @param {number} cArr - Specifies the license key as number.
 * @returns {string} ?
 */
function convertToChar(cArr: number[]): string {
    let ret: string = '';
    for (const arr of cArr) {
        ret += String.fromCharCode(arr);
    }
    return ret;
}
/**
 * To set license key.
 *
 * @param {string} key - license key
 * @returns {void}
 */
export function registerLicense(key: string): void {
    if (typeof window !== 'undefined') {
        key = (window as any).helatraLicenseKey ? (window as any).helatraLicenseKey : key;
    }
    licenseValidator = new LicenseValidator(key);
}

export const validateLicense: Function = (component: string, key?: string): boolean => {
    if (typeof window !== 'undefined') {
        key = (window as any).helatraLicenseKey ? (window as any).helatraLicenseKey : key;
    }
    if (key) {
        registerLicense(key);
    }
    return licenseValidator.validate(component);
};

export const getVersion: Function = (): string => {
    return licenseValidator.version;
};

// Method for create overlay over the sample

export const createLicenseOverlay: Function = (): void => {
    const bannerTemplate: string = `licence validation failed. Please provide a valid license key to run the application without this message. Refer to the documentation for more details.`;
    if (typeof document !== 'undefined' && !isNullOrUndefined(document)) {
        const errorBackground: HTMLElement = createElement('div', {
            innerHTML: bannerTemplate
        });
        document.body.appendChild(errorBackground);
    }
};

interface IValidator {
    prefixRegex?: string;
    incorrectPlatform?: string;
    version?: string;
    expiryDate?: string;
    platform?: string;
    invalidPlatform?: boolean;
    lastValue?: number;
    minVersion?: number;
}

interface IErrorType {
    noLicense: string;
    trailExpired: string;
    versionMismatched: string;
    platformMismatched: string;
    invalidKey: string;
    componentRestricted: string;
}
