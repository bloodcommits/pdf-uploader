import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    padding: 40,
    color: '#333',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f4880', // Dark blue header color
  },
  contactInfo: {
    fontSize: 10,
    color: '#666',
    marginBottom: 10,
  },
  line: {
    borderBottom: '2px solid #0f4880',
    marginVertical: 10,
  },
  sectionContainer: {
    display: 'flex',
    flexDirection: 'row',
    // marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#0f4880',
    textTransform: 'uppercase',
    width: '30%', // Title on the left (30% of the width)
  },
  sectionContent: {
    fontSize: 10,
    width: '70%', // Content on the right (70% of the width)
    color: '#333',
    lineHeight: 1.4,
  },
  jobTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: "extrabold",
    color: '#333',
    fontSize:12
  },
  jobDate: {
    fontSize: 10,
    color: "black",
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 4,
    fontSize: 10,
  },
  link: {
    color: '#0f4880',
    textDecoration: 'none',
  },
  workExperience: {
    marginBottom: 12, // Margin between different job experiences
  },
  education: {
    marginBottom: 12, // Margin between different education entries
  },
  hr:{
    borderBottom: '1.5px solid #0f4880',
    marginVertical:10
  },

});
const Resume = () => {
  const [data, setData] = useState<{
    personalInfo: {
      name: string
      phone: string
      email: string
      age: string
      location: string
    }
    academicQualifications: Array<string>
    professionalSummary: Array<string>
    professionalExperience: Array<{
      position: string
      company: string
      description: string
      duration: string
    }>
    additionalResponsibilities: Array<string>
    professionalSkills: Array<string>
    projects: Array<{
      name: string
      url: string
      description: string
      date: string
    }>
    sociallinks: Array<{
      platform: string
      url: string
    }>
  }>()

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
    {/* Header */}
    <View>
      <Text style={styles.header}>{data?.personalInfo.name}</Text>
      <Text style={styles.contactInfo}>
        {data?.personalInfo.email} | {data?.personalInfo.phone} | {data?.personalInfo.location} 
        </Text>
        <Text>  
        <Link style={styles.link} src="https://www.reallygreatsite.com">
          {data?.personalInfo.age}
        </Link>
      </Text>
    </View>

    {/* Line Break */}


    {/* Summary */}
    {data?.professionalSummary&&data?.professionalSummary.length>1 &&(
      <>
          <View style={styles.line}></View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Text style={styles.sectionContent}>
          {data.professionalSummary}
        </Text>
      </View>
      </>
)}

    {/* Work Experience */}
  {  data?.professionalExperience && data.professionalExperience.length>1 &&(
    <>
    <View style={styles.hr} />
    <View style={styles.sectionContainer}>
    <Text style={styles.sectionTitle}>Work Experience</Text>
    <View style={styles.sectionContent}>
    {
      data.professionalExperience.map((exp , index)=>(
       
                <View style={styles.workExperience}>
                  <View style={styles.jobTitleRow}>
                    <Text style={styles.jobTitle}>{exp.company}, {exp.position}</Text>
                    <Text style={styles.jobDate}>{exp.duration}</Text>
                  </View>
                  <Text style={styles.bulletPoint}>• {exp.description}</Text>
                </View>
        
                
        
                ))
    }
    
    </View>
  </View>
    </>

  )}



    {/* Education */}
    <View style={styles.hr} />
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Education</Text>
      <View style={styles.sectionContent}>
        <View style={styles.education}>
          <View style={styles.jobTitleRow}>
            <Text style={styles.jobTitle}>Bachelor of Business Administration</Text>
            <Text style={styles.jobDate}>Jan 2019 - Feb 2021</Text>
          </View>
          <Text style={styles.bulletPoint}>University of Business Excellence</Text>
          <Text style={styles.bulletPoint}>• Major in International Business</Text>
          <Text style={styles.bulletPoint}>• Final CGPA: 3.90</Text>
        </View>

        <View style={styles.education}>
          <View style={styles.jobTitleRow}>
            <Text style={styles.jobTitle}>Foundation in Business Administration</Text>
            <Text style={styles.jobDate}>Jan 2018 - Dec 2018</Text>
          </View>
          <Text style={styles.bulletPoint}>Borcelle University</Text>
          <Text style={styles.bulletPoint}>• Final CGPA: 3.80</Text>
        </View>
      </View>
    </View>

    {/* Key Skills */}
    <View style={styles.hr} />
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Key Skills</Text>
      <View style={styles.sectionContent}>
        {data?.professionalSkills.map((skill , index)=>(
          <Text style={styles.bulletPoint}>• {skill}.</Text>
        
        ))}
      </View>
    </View>
  </Page>
</Document>
)
};
  



const ReactPdfResumeTemplate1 = () => (
    <PDFViewer width={"100%"} height={"100%"}>
        <Resume />
    </PDFViewer>
  );

export default ReactPdfResumeTemplate1