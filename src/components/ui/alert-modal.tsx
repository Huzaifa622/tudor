import {
    AlertDialog,

    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,

  } from "@/components/ui/alert-dialog"

  interface Props {
    showModal : boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setLoader: React.Dispatch<React.SetStateAction<boolean>>;
    err: string;
  }
  export function Alert({showModal , setShowModal , err , setLoader} : Props) {
    return (
      <AlertDialog open={showModal} onOpenChange={setShowModal} >
        {/* <AlertDialogTrigger asChild>
          <Button variant="outline">Show Dialog</Button>
        </AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Error</AlertDialogTitle>
            <AlertDialogDescription>
             {err}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{setLoader(false); setShowModal(false)}}  >Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  