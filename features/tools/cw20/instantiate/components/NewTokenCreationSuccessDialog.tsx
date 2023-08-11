import { Dialog, DialogContent, DialogHeader, Text } from "junoblocks";

type NewTokenCreationSuccessDialogProps = {
  isShowing: boolean;
  address: string;
};

const NewTokenCreationSuccessDialog = ({
  isShowing,
  address
}: NewTokenCreationSuccessDialogProps) => {
  return (
    <Dialog isShowing={isShowing} onRequestClose={null}>
      <DialogHeader paddingBottom="$13">
        <Text variant="header">New Token has instantiated</Text>
      </DialogHeader>
      <DialogContent>
        <Text variant="header">Contract address</Text>
        <Text variant="header">{address}</Text>
      </DialogContent>
    </Dialog>
  )
};

export default NewTokenCreationSuccessDialog;