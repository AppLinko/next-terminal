import requests from "./core/requests";

export interface License {
    type: string;
    machineId: string;
    asset: number;
    concurrent: number;
    user: number;
    expired: number;
}

// 定义 License 类
export class SimpleLicense {
    type: string | '' | 'free' | 'test' | 'premium' | 'enterprise';
    expired?: number;

    constructor(type: string, expired?: number) {
        this.type = type;
        this.expired = expired;
    }

    // 添加方法
    isPremium(): boolean {
        return this.type === 'premium';
    }

    isEnterprise(): boolean {
        return this.type === 'enterprise';
    }

    isTest(): boolean {
        return this.type === 'test';
    }

    isFree(): boolean {
        return this.type === '' || this.type === 'free';
    }

    isExpired(): boolean {
        return this.expired !== undefined && this.expired > 0 && this.expired < new Date().getTime();
    }
}

class LicenseApi {

    group = "/admin/license";

    getMachineId = async () => {
        return await requests.get(`${this.group}/machine-id`);
    }

    getLicense = async () => {
        return await requests.get(`${this.group}`) as License;
    }

    getSimpleLicense = async () => {
        // 直接返回 'enterprise' 类型的 SimpleLicense 实例
        return new SimpleLicense('enterprise');
    }

    setLicense = async (values: any) => {
        await requests.post(`${this.group}`, values);
    }

    requestLicense = async () => {
        await requests.post(`${this.group}/request`);
    }
}

let licenseApi = new LicenseApi();
export default licenseApi;