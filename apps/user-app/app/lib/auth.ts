
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from "bcrypt"
import { client } from '@repo/db/client';

export const authOptions = {
    providers:[
        CredentialsProvider({
            name: "Phone number",
            credentials: {
                name:{label:"Name",type:"text",placeholder:"delta charlie"},
                email:{label:"Email",type:"email",placeholder:"example@email.com"},
                phone: { label: "Phone number", type: "text", placeholder: "0123456789",required:true},
                password: { label: "Password", type: "password", placeholder: "Enter password",required:true }
            },
            async authorize(credentials:any) {
                const hashedPassword = await bcrypt.hash(credentials?.password,10)
                const userexist = await  client.user.findFirst({
                    where:{
                        number:credentials.phone
                    }
                });
                if(userexist){
                    //  console.log("User exists ",userexist);
                     const passwordValidation = await bcrypt.compare(credentials?.password,userexist.password);
                    if(passwordValidation){
                        //console.log("returning user detail as it is authorized")
                        return {
                            id:userexist.id.toString(),
                            name:userexist.name,
                            email:userexist.email,
                            number:userexist.number

                        }
                    } else{
                        console.log("Invalid password")
                    }
                   
                }
                try{
                    
                        const user = await client.user.create({
                            data:{
                                name:credentials.name,
                                email:credentials.email,
                                number:credentials.phone,
                                password:hashedPassword
                            }
                        });
                        // console.log(user);
                        
                        await client.balance.create({
                            data:{
                                userId:user.id,
                                amount:0,
                                locked:0
                            }
                        });
                        // console.log(balance);
                        
                        return {
                            id:user.id.toString(),
                            name:user.name,
                            email:user.email,
                            number:user.number
                        }
                    
                   

                    
                }catch(e){
                    console.error(e);
                }
                return null
            },
            
        })
    ],
    secret:process.env.JWT_SECRET,
    callbacks:{
        async jwt({token,user}:any){
          //  console.log("JWT callback ",token,user);
            if(user){
                 // This runs only during the first login or sign-in
                token.sub = user.id;
            }
            return token
        },
        async session({token,session}:any){
            //  console.log("callback called");
            //console.log("Token:", token);
            //  console.log("Session:", session);
            session.user.id = token.sub
            return session
        }
       
    },
    
   

}