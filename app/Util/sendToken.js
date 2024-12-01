import ip from "./localhost";
import { checkEmail } from "./checkData";



export async function sendToken(popup, email) {
    let emailVerification = checkEmail(email)

    if(emailVerification.validate){
      try {
        const response = await fetch(`${ip}/forgotPassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.status == 200) {
          popup("Sucesso", `Enviamos um e-mail para a conta ${email}`, null, "green")
          return true
        } else {
          popup("Erro", "Erro ao enviar e-mail para a conta", null, "red")
          return false
        }
      } catch (error) {
        console.log(error)
        return false
      }
    }else{
      popup(emailVerification.message, null, "red")
      return false
    }
}