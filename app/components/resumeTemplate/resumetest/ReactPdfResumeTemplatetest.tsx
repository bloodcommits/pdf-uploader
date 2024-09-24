import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer,Font,Image, Link } from '@react-pdf/renderer';


// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'uppercase',
    color: '#0056B3',
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  item: {
    width: '30%',
    fontSize: 10,
    marginBottom: 5,
  },
});

// Sample array data (skills)
const skillsArray = [
  'Prototyping Tools',
  'User Research',
  'Information Architecture',
  'Interaction Design',
  'Visual Design',
  'Usability Heuristics',
  'Accessibility',
  'Responsive Design',
  'User Testing Tools',
];


const Resume = () => {
  const [data, setData] = useState<{
    personalInfo: {
      name: string;
      phone: string;
      email: string;
      age: string;
      location: string;
    };
    professionalSummary: Array<string>;
    professionalExperience: Array<{
      position: string;
      company: string;
      description: string;
      duration: string;
    }>;
    additionalResponsibilities: Array<string>;
    professionalSkills: Array<string>;
    projects: Array<{
      name: string;
      url: string;
      description: string;
      date: string;
    }>;
    sociallinks: Array<{
      platform: string;
      url: string;
    }>;
    
    academicQualifications: Array<{
      InstitutionName:string;
      description:string;
      duration:string;
    }>;
    
    certifications: Array<{
      nameOfCertificates:string;
      durationOfCompletion:string;
    }>;
    awards: Array<{
      nameOfAward:string;
      duration:string;
    }>;
    roleCandidateDeserves:string;
  }>();


  useEffect(() => {
    const jsondata = localStorage.getItem("data");
    if (jsondata) {
      const data = JSON.parse(jsondata);
      console.log(data);

      setData(data);

    }
  }, []);


return(
  <Document>
<Page size="A4" style={styles.page}>
      <Text style={styles.title}>Technical Skills</Text>
      <View style={styles.section}>
        {skillsArray.map((skill, index) => (
          <Text key={index} style={styles.item}>
            {skill}
          </Text>
        ))}
      </View>
    </Page>
</Document>
);
};
  



const ReactPdfResumeTemplatetest = () => (
    <PDFViewer width={"100%"} height={"100%"}>
        <Resume />
    </PDFViewer>
  );

export default ReactPdfResumeTemplatetest