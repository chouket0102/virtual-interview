"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import FormField from "./FormField"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/firebase/client"
import { signIn, signUp } from "@/lib/actions/auth.action"

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({type}:{type:FormType}) => {
    const router = useRouter();

    const formSchema = authFormSchema(type);
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        name: "",
        email: "",
        password: "",
      },
    });
 
    const onSubmit = async (data: z.infer<typeof formSchema>) => {
      try {
        if(type==='sign-up'){
          const {name,email,password}=data;
          
          const userCredentials=await createUserWithEmailAndPassword(auth,email,password);

          const result=await signUp({
            uid:userCredentials.user.uid,
            name:name!,
            email,
            password
          })
          if (!result.success) {
            toast.error(result.message);
            return;
          }

          toast.success('Account created successfully');
          router.push('/sign-in')

        }else{

          const {email,password}=data;
          const userCredential=await signInWithEmailAndPassword(auth,email,password);

          const idToken = await userCredential.user.getIdToken();
        if (!idToken) {
          toast.error("Sign in Failed. Please try again.");
          return;
        }

        await signIn({
          email,
          idToken,
        });


          toast.success('Signed in successfully');
          router.push('/')

        }
          
          
  
          
  
          
      } catch (error) {
        console.log(error);
        toast.error(`There was an error: ${error}`);
      }
    };
      const isSignIn=type==='sign-in';
  return (
    <div className="card-border lg:min-w-[556px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
        <Image src="/mylogo.png"
        alt="logo"
        height={50} width={58}/>
        
        </div>
        <h3>Practice job interview with AI</h3>
        

      
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Name"
                placeholder="Your Name"
                type="text"
              />
            )}

            <FormField
              control={form.control}
              name="email"
              label="Email"
              placeholder="Your email address"
              type="email"
            />

            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="Enter your password"
              type="password"
            />

            <Button className="btn" type="submit">
              {isSignIn ? "Sign In" : "Create an Account"}
            </Button>
          </form>
        </Form>

    <p className="text-center">
      {isSignIn ? 'No Account yet?': 'Already have an account?'}
      <Link href={!isSignIn ? '/sign-in':'/sign-up'}
      className="text-bold text-user-primary ml-1">
        {!isSignIn ? 'Sign in': 'Sign up'}
      </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm