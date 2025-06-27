import React, {useState} from 'react';
import {FormProvider, useForm} from 'react-hook-form';

import {
  MagnifyingGlass,
  Mail,
  MessageQuestionMark,
  Pencil,
} from '@src/assets/icons';
import {Button} from '@src/components/core/Button';
import {Checkbox} from '@src/components/core/Checkbox';
import {LabeledInput} from '@src/components/core/LabeledInput';
import {Switch} from '@src/components/core/Switch';
import {LoginModal} from '@src/components/ui/LoginModal';

export default function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [isDisabledToggled, setIsDisabledToggled] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const methods = useForm({
    defaultValues: {
      formSwitch: false,
      formCheckbox: false,
    },
  });

  return (
    <FormProvider {...methods}>
      <div className="bg-white p-10">
        <div className="">
          <div className="flex flex-col md:flex-row items-start gap-4 p-4 rounded-lg">
            <div className="flex flex-col items-start gap-4">
              <h2 className="text-lg font-bold mb-4">New Buttons</h2>

              <Button variant="primary" size="md">
                <Pencil width={20} height={20} color="white" />
                <div>POST AN ARTICLE</div>
              </Button>

              <Button variant="primary" size="sm">
                <MagnifyingGlass width={24} height={24} color="white" />
                <div>Subscribe</div>
              </Button>

              <Button variant="primary" size="xs">
                <MagnifyingGlass width={16} height={16} color="white" />
                <div>Subscribe</div>
              </Button>

              <Button variant="primary" size="sm" isIconOnly>
                <MagnifyingGlass width={20} height={20} color="white" />
              </Button>

              <Button variant="secondary" size="md">
                <MessageQuestionMark width={20} height={20} />
                <div>ASK A QUESTION</div>
              </Button>

              <Button variant="secondary" size="md">
                <MessageQuestionMark width={18} height={18} />
                <div>Subscribe</div>
              </Button>

              <Button variant="outlined" size="md">
                <Mail width={18} height={18} />
                <div>Get Daily Insider</div>
              </Button>

              <Button variant="outlined" size="sm">
                <Mail width={16} height={16} />
                <div>Get Daily Insider</div>
              </Button>

              <Button variant="ads" size="md">
                Register Now
              </Button>
              <Button variant="txt" size="md">
                Show More
              </Button>
            </div>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold mb-4">New Inputs</h2>

              <LabeledInput
                label="Email address"
                error={{message: 'Error', type: 'required'}}
              />
              <LabeledInput label="Login" error={undefined} />
              <LabeledInput
                label="Password"
                type="password"
                error={undefined}
              />
              <LabeledInput placeholder="Placeholder" error={undefined} />
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold mb-4">New Switches</h2>
              <div className="flex flex-col gap-2">
                <h3>useState</h3>
                <Switch value={isToggled} onChange={setIsToggled} />
              </div>
              <div className="flex flex-col gap-2">
                <h3>useState (disabled)</h3>
                <Switch
                  value={isDisabledToggled}
                  onChange={setIsDisabledToggled}
                  disabled={!isToggled}
                />
              </div>
              <div className="flex flex-col gap-2">
                <h3>react-hook-form</h3>
                <form>
                  <Switch name="formSwitch" />
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold mb-4">New Checkboxes</h2>
              <div className="flex flex-col gap-2">
                <Checkbox
                  value={isChecked}
                  onChange={setIsChecked}
                  label="Checkbox"
                />
                <Checkbox value={true} onChange={() => {}} label="Checked" />
                <Checkbox
                  value={false}
                  onChange={() => {}}
                  label="Disabled"
                  disabled={!isChecked}
                />
                <Checkbox
                  value={false}
                  onChange={() => {}}
                  label="Highlighted"
                  highlighted
                />
                <Checkbox
                  value={false}
                  onChange={() => {}}
                  label="Rounded"
                  rounded
                />
                <form>
                  <Checkbox name="formCheckbox" label="React Hook Form" />
                </form>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsLoginModalOpen(true)}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Open Login Modal
        </button>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSwitchToSignup={() => {
            setIsLoginModalOpen(false);
            console.log('Switch to signup');
          }}
        />
      </div>
    </FormProvider>
  );
}
