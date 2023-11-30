import { Component } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent {
  manual:any=[
    {
      title:'Login as Alumni',
      content:[
        {
          description:"To login as alumni, choose “Alumni” account then enter the email and password then click “Login”",
          image:'../../../../../assets/manual/alumni/login.png'
        }
      ]
    },
    {
      title:'Dashboard',
      content:[
        {
          description:"If you are on the login page, enter your username and password, select type (Alumni), and click login; then, you will proceed to the alumni dashboard.",
          image:'../../../../../assets/manual/alumni/dashboard.png'
        }
      ]
    },
    {
      title:'Answer the Survey',
      content:[
        {
          description:"To answer the default survey in the alumni dashboard click “Survey” then provide the needed information for the survey then click submit.",
          image:'../../../../../assets/manual/alumni/defaultSurvey.png'
        },
        {
          description:"After answering the default survey, another survey will pop up if there is a posted custom survey, answer it and submit. ",
          image:'../../../../../assets/manual/alumni/customSurvey.png'
        }
      ]
    },
    {
      title:'View the Events',
      content:[
        {
          description:"Click the “Events” in the dashboard to view the events from the university. Alumni can comment and like on the posted events.",
          image:'../../../../../assets/manual/alumni/events.png'
        },
        {
          description:"After the admin post the events, an email notification will be sent to you, click the link to check out the event.",
          image:'../../../../../assets/manual/alumni/events-email.png'
        }
      ]
    },
    {
      title:'Change the Password and Profile',
      content:[
        {
          description:'Go to the upper right corner and click your photo; click the settings; click "Change Password”. Next, input your old password and new password and confirm them. After that, click "Submit”. You can also edit your profile, change the photo, Name and Email. Just click the “Edit Profile”.',
          image:'../../../../../assets/manual/alumni/changePassword.png'
        }
      ]
    },
    {
      title:'Update Survey',
      content:[
        {
          description:'If you want to update your employability status click “Retake Survey” but this is only if you got another job within this year. You can edit your general information by clicking the “small note” beside general information.',
          image:'../../../../../assets/manual/alumni/retake.png'
        }
      ]
    },
    {
      title:'Forgot Password',
      content:[
        {
          description:'Click Forgot Password then input the email address to send a recovery email and submit.',
          image:'../../../../../assets/manual/alumni/forgePassword.png'
        },
        {
          description:'An email will be sent to you, Click reset password.',
          image:'../../../../../assets/manual/alumni/forgetPasswordEmail.png'
        }
      ]
    },
  ]
}
