import { handleDelete } from "../../../actions/actions";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import {Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast"

const DeleteUser = ({ user }:any) => {
console.log("id",user._id)
  async function clientAction() {
    const numb = "6543b712e1b13490988646f7"
    const result = await handleDelete(user._id);
    if (result?.error) {
      toast({
        title:"There was a problem with your request.",
        description:  result.error,
       
      })
    }

    toast({
      title: "Data deleted successfully.",
      description: "Your user profile has been removed.",
    });
  }


  return (
    <div>
      <AlertDialog>
      <AlertDialogTrigger asChild>
    
        <Trash2 className="h-5 w-5" />
      
      </AlertDialogTrigger>
      <AlertDialogContent className=" bg-slate-100 dark:bg-slate-900">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          This action is irreversible. It will permanently delete the account associated with <span className="text-red-600	">{user.email}</span> and remove all related data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={clientAction}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </div>
  );
};

export default DeleteUser;