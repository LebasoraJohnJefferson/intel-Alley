import { Component } from '@angular/core';

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent {
  manual:any=[
    {
      title:'Login as Admin',
      content:[
        {
          description:"To login as admin account type, go to (https://intel-alley.vercel.app/login?type=admin). Click to login choose admin as account type then enter the provided credentials email and password then click “Login”.",
          image:'../../../../../assets/manual/admin/login.png'
        }
      ]
    },
    {
      title:'Change Admin Profile and Password',
      content:[
        {
          description:"Click “Admin or Photo” on the top right corner of the dashboard.",
          image:'../../../../../assets/manual/admin/admin-profile.png'
        },
        {
          description:"Click the button settings, choose Edit Profile then provide the following Full Name and Email then click “Update” button.",
          image:'../../../../../assets/manual/admin/change-credentials.png'
        },
        {
          description:"To change the password, click the settings button choose Change Password, input the old password and new password then click “Submit”.",
          image:'../../../../../assets/manual/admin/password-change.png'
        }
      ]
    },
    {
      title:'Create Alumni Account',
      content:[
        {
          description:"Only administrator can create an alumni account.",
          image:'../../../../../assets/manual/admin/add-alumni.png'
        },
        {
          description:"To create an alumni account go to alumni dashboard, then click the “Create” button. Another option to create multiple account is use the “Import” function it requires excel file. After clicking the create button, provide the information of the alumni, their default password is their birth date, then click “Create” button.",
          image:'../../../../../assets/manual/admin/create-alumni-form.png'
        }
      ]
    },
    {
      title:'List of Alumni',
      content:[
        {
          description:"Click “View” to see alumni information.",
          image:'../../../../../assets/manual/admin/alumni-list.png'
        },
        {
          description:"Alumni information will be displayed based on the survey they answered. Information will be change if the alumni update their information. Click “Delete Account” button to delete an alumni, the system allows to retrieve the deleted account in the retrieve function.",
          image:'../../../../../assets/manual/admin/alumni-profile.png'
        },
      ]
    },
    {
      title:'Visualization of Data Analytics',
      content:[
        {
          description:"You can see here the graph and visualization of the gathered data from the alumni. To view the data visualization go to Analytics dashboard. Click the “Calendar” to navigate different data analytics by year and you can “Filter” the analytics by year batch of alumni. Scroll down to view other data analytics. Click “Survey” for the data analytics of the custom survey.",
          image:'../../../../../assets/manual/admin/default-analytics.png'
        }
      ]
    },
    {
      title:'Create a Custom Survey',
      content:[
        {
          description:"To create a custom survey go to survey dashboard then Click “Create”. To update the survey click “Edit”. Click “Delete” to remove the survey. Click “View” to see the Data Analytics of the survey.",
          image:'../../../../../assets/manual/admin/custom-survey.png'
        },
        {
          description:"Input Survey Name, Description, and Due Date of the survey and set it to active status. Then click “Create”.",
          image:'../../../../../assets/manual/admin/create-custom-survey.png'
        },
        {
          description:"Add a question from the created survey then click “Create”.",
          image:'../../../../../assets/manual/admin/survey-question.png'
        },
        {
          description:"Click the “three dots” to add options, to edit the question and to delete the question.",
          image:'../../../../../assets/manual/admin/survey-options.png'
        }
      ]
    },
  ]
}
