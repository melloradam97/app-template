export enum GlobalModal {}

export const globalModals = {}

declare module "@mantine/modals" {
  export interface MantineModalsOverride {
    modals: typeof globalModals
  }
}
