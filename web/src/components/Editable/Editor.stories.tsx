import React from 'react';
import { EditorEvent, Events, Editor as TinyMCEEditor } from 'tinymce';
import { Story } from '@storybook/react';
import { Editor } from '@tinymce/tinymce-react';

const apiKey = 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc';
// const apiKey = 'zj4niwwuirj95hz0qmjpuy6rce06t42hdymhjycm402mwtzb';
const sampleContent = `
<h2><a href="http://officeipsum.com/index.php"target="_blank">OfficeIpsum.com</a></h2>

<p>We need evergreen content regroup but quick sync nor out of scope. Call in the air support great plan! let me diarize this, and we can synchronise ourselves at a later timepoint or time to open the kimono.</p>

<code>Flesh that out cloud strategy. Globalize no scraps hit the floor, for disband the squad but rehydrate as needed and sacred cow tribal knowledge offline this discussion pushback. Turn the ship turn the crank paddle on both sides dogpile that, and globalize.</code>

<h4>Put a record on and see who dances goalposts we want to see more charts. Close the loop a loss a day will keep you focus, but dogpile that or we can't hear you . Business impact make it look like digital. C-suite on-brand but completeley fresh fast track . Social currency blue sky thinking that's mint, well done. Future-proof criticality for execute . </h4>

<ul>
<li>The last person we talked to said this would be ready copy and paste from stack overflow touch base, or i don't want to drain the whole swamp, i just want to shoot some alligators radical candor so can you send me an invite?. </li>
<li>The closest elephant is the most dangerous my capacity is full slow-walk our commitment market-facing digital literacy. </li>
</ul>

<section>In this space ultimate measure of success. We need to crystallize a plan low hanging fruit punter for throughput yet locked and loaded, but note for the previous submit: the devil should be on the left shoulder. Punter products need full resourcing and support from a cross-functional team in order to be built, maintained, and evolved.</section>

<table> <tr><th>Name</th><th>Favorite Color</th></tr><tr><td>Bob</td><td>Yellow</td></tr><tr><td>Michelle</td><td>Purple</td></tr></table>
<br/>
<h2><a href="legalipsum.com">Legal Ipsum</h2>
<section>
<tt>If within 60 days notice from Respondent (the "Notice Period") unless within that District with respect to end users, business partners and the same in accordance with the terms of the software accompanying this Agreement to the maximum extent possible, (ii) cite the statute or regulation then You must duplicate, to the notice described in Exhibit A as Original Code, to make, use, sell, offer for sale, and/or otherwise dispose of Licensed Product or portions thereof with code not governed by and in the case of files belonging to any program or other intellectual property rights is required to allow Recipient to distribute corresponding source code, object code form. This patent license shall apply to the extent applicable law, if any, in source or binary form must reproduce the above conditions for use, reproduction, and distribution of the use and distribution of the Program, the Contributor who includes the Program with the Open Source Initiative. Software distributed under this License and fail to cure such breach within 30 days of becoming aware of such claim, and b) in the United Nations Convention on Contracts for the Source Code of Your choice, which may be to provide a warranty) and that you do not include works that are distributed by Motosoto.Com B.V.</tt>
<section>
`;

export default {
  title: 'TinyMCE/Stock Editors',
  component: Editor,
};

export const IframeEditor: Story = () => <Editor apiKey={apiKey} initialValue={sampleContent} />;
IframeEditor.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const InlineEditor: Story = () => (
  <div style={{ paddingTop: '100px' }}>
    <Editor apiKey={apiKey} initialValue={sampleContent} inline />
  </div>
);
InlineEditor.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ControlledInput: Story = () => {
  const [data, setData] = React.useState(sampleContent);
  return (
    <div>
      <Editor apiKey={apiKey} value={data} onEditorChange={(e) => setData(e)} inline />
      <textarea style={{ width: '100%', height: '200px' }} value={data} onChange={(e) => setData(e.target.value)} />
    </div>
  );
};
ControlledInput.parameters = {
  controls: { hideNoControlsWarning: true },
};

// The editor will enforce a value that is given to it.
// Note that the value must be valid HTML or it will forever correcting it and then rolling back the change.
export const ControlledInputFixed: Story = () => (
  <div>
    <Editor apiKey={apiKey} value={'<p>This value is <strong>fixed</strong> and can not be <em>changed</em>.</p>'} />
  </div>
);
ControlledInputFixed.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ControlledInputLimitLength: Story = () => {
  const sizeLimit = 50;
  const [data, setData] = React.useState('<p>This field can only take 50 characters.</p>');
  const [len, setLen] = React.useState(0);

  const handleInit = (evt: unknown, editor: TinyMCEEditor) => {
    setLen(editor.getContent({ format: 'text' }).length);
  };

  const handleUpdate = (value: string, editor: TinyMCEEditor) => {
    const length = editor.getContent({ format: 'text' }).length;
    if (length <= sizeLimit) {
      setData(value);
      setLen(length);
    }
  };

  const handleBeforeAddUndo = (evt: EditorEvent<Events.EditorEventMap['BeforeAddUndo']>, editor: TinyMCEEditor) => {
    const length = editor.getContent({ format: 'text' }).length;
    // note that this is the opposite test as in handleUpdate
    // because we are determining when to deny adding an undo level
    if (length > sizeLimit) {
      evt.preventDefault();
    }
  };

  return (
    <div>
      <Editor
        apiKey={apiKey}
        value={data}
        onEditorChange={handleUpdate}
        onBeforeAddUndo={handleBeforeAddUndo}
        onInit={handleInit}
      />
      <p>Remaining: {sizeLimit - len}</p>
    </div>
  );
};
ControlledInputLimitLength.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const ToggleDisabledProp: Story = () => {
  const [disabled, setDisabled] = React.useState(true);
  const toggleDisabled = () => setDisabled((prev) => !prev);
  return (
    <div>
      <Editor apiKey={apiKey} initialValue={sampleContent} disabled={disabled} />
      <button onClick={toggleDisabled}>{disabled ? 'Enable Editor' : 'Disable Editor'}</button>
    </div>
  );
};
ToggleDisabledProp.parameters = {
  controls: { hideNoControlsWarning: true },
};

export const CloudChannelSetTo5Dev: Story = () => (
  <div>
    <Editor apiKey={apiKey} cloudChannel="5-dev" initialValue={sampleContent} />
    <p>Refresh the page to ensure a load from the "5-dev" channel</p>
  </div>
);
CloudChannelSetTo5Dev.storyName = 'Cloud Channel Set To "5-dev"';
CloudChannelSetTo5Dev.parameters = {
  controls: { hideNoControlsWarning: true },
};
