export type IntegrationType = 'script' | 'gtm';

export interface GTMTagConfig {
  triggerType: string;
  triggerName: string;
  htmlCode: string;
  triggerConditions: {
    variable: string;
    operator: string;
    value: string;
  }[];
}