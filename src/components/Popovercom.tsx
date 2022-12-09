import { Popover, ActionList, Icon } from "@shopify/polaris";
import { MobileVerticalDotsMajor } from "@shopify/polaris-icons";
import { useState, useCallback } from "react";

function Popovercom() {
  const [popoverActive, setPopoverActive] = useState<boolean>(false);

  const togglePopoverActive = useCallback(() => setPopoverActive((popoverActive) => !popoverActive),[]);

  const activator = (
    <div onClick={togglePopoverActive}>
      <Icon source={MobileVerticalDotsMajor} color="base" />
    </div>
  );

  return (
    <div>
    <Popover
      active={popoverActive}
      activator={activator}
      onClose={togglePopoverActive}
    >
      <Popover.Pane fixed>
        <ActionList 
            items={[
              { content: "image"},
              { content: "title"},
              { content: "product"},
              { content: "inventry"},
              { content: "variant"},
            ]}
          />
        </Popover.Pane>
      </Popover>
    </div>
  );
}

export default Popovercom;
