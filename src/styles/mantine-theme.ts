import { ButtonProps, MantineThemeOverride } from "@mantine/core"

const ButtonDefaultProps: Partial<ButtonProps> = {
  size: "md",
  variant: "light",
}

export const theme: MantineThemeOverride = {
  loader: "bars",
  colorScheme: "dark",
  cursorType: "pointer",
  primaryColor: "violet",
  components: {
    Button: {
      defaultProps: ButtonDefaultProps,
    },
  },
}
