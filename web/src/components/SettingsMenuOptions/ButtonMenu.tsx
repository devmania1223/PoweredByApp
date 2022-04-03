import Link from '@material-ui/icons/Link';
import { useEffect, useState } from 'react';
import { Option } from './Option';
import { OptionGroup } from './OptionGroup';
import LinkDialog, { LinkDialogMenuOption, LinkOption } from './Dialog/LinkDialog';

const LinkDialogOptions: LinkOption[] = [
  {
    value: 'web',
    label: 'Web Address',
  },
  // as per #1u9gugb, temp removing this until we can get the links working
  // {
  //   value: 'email',
  //   label: 'Email',
  // },
  // {
  //   value: 'phone',
  //   label: 'Phone',
  // },
];

export type ButtonMenuProps = {
  title?: string;
  url?: string;
  onChange?: (title: string, url: string) => void;
  onMenuChange: (option: LinkDialogMenuOption) => void;
};

export const ButtonMenu = (props: ButtonMenuProps) => {
  const { title, url, onChange, onMenuChange } = { ...props };
  const [titleFormField, setTitleFormField] = useState(title);
  const [urlFormField, setUrlFormField] = useState(url);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    setTitleFormField(title);
    setUrlFormField(url);

    let option: LinkDialogMenuOption;
    if (url.includes('http')) {
      option = 'web';
      // as per #1u9gugb, temp removing this until we can get the links working
      // } else if (url.includes('mailto:')) {
      //   option = 'email';
      // } else if (url.includes('tel') || url.includes('sms')) {
      //   option = 'phone';
    }
    if (option) {
      onMenuChange(option);
    }
  }, [title, url, onMenuChange]);

  return (
    <>
      <OptionGroup title="Button">
        <Option icon={Link} label="Link" clickable={true} onClick={() => setOpenDialog(true)} />
        <LinkDialog
          open={openDialog}
          handleClose={() => setOpenDialog(false)}
          options={LinkDialogOptions}
          value={urlFormField}
          onChange={(url: string) => {
            onChange(titleFormField, url);
          }}
        />
      </OptionGroup>
    </>
  );
};
