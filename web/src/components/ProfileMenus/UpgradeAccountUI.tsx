import { SnackbarOrigin } from '@material-ui/core/Snackbar';
import { UpgradeView } from './UpgradeView';

export type UpgradeAccountUIProps = {
  position?: SnackbarOrigin;
  isVisible: string;
};

const defaultProps: Partial<UpgradeAccountUIProps> = {
  position: { vertical: 'top', horizontal: 'right' },
};

export const UpgradeAccountUI = (props: UpgradeAccountUIProps) => {
  const { position, isVisible } = {
    ...defaultProps,
    ...props,
  };

  const expandedProps = {
    position: position,
  };

  if (isVisible !== 'true') return null;

  return <UpgradeView {...expandedProps} />;
};
