import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer,Font,Image, Link } from '@react-pdf/renderer';


const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 20,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
    backgroundColor: '#d1e4e2',
    padding: 5,
  },
  section: {
    marginBottom: 10,
  },
  contentText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight:1.5,
  },
  technicalSkills: {
    marginBottom: 20,
  },
  skillList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  projectList: {
    marginBottom: 20,
  },
  project: {
    marginBottom: 10,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize:12,
    marginBottom:5,
  },
  date: {
    fontSize: 10,
    fontStyle: 'italic',
  },
  awardList: {
    marginTop: 10,
  },
  link: {
    color: 'black', // Standard blue for link
    textDecoration: 'none',
  },
  techSkillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap:2,
    justifyContent: 'space-between',
    
  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
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
      <Text style={styles.subHeader}>{data?.personalInfo.location} | {data?.personalInfo.email} | <Link style={styles.link} src="https://gmail.com">{data?.personalInfo.phone}</Link></Text>
      <Text style={styles.subHeader}>SOFTWARE ENGINEER</Text>
    </View>

    {/* Technical Skills */}
    {data?.professionalSkills && data.professionalSkills.length>1 && (
    <View style={styles.technicalSkills}>
      <Text style={styles.sectionTitle}>Technical Skills</Text>
      <View style={styles.techSkillsContainer}>
      {(data?.professionalSkills || []).map((skills:any)=>{
        return(
          <Text style={styles.skillItem}>• {skills}</Text>  
        )
      })}
        
      </View>
    </View>
 
      )}

    {/* Projects */}
    {data?.projects&&data.projects.length>1&&(
    <View style={styles.projectList}>
      <Text style={styles.sectionTitle}>Projects</Text>
     {data.projects.map((project , index)=>(
      <View style={styles.project}>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}> {project.name}  {project.url}</Text>
          <Text style={styles.date}>{project.date}</Text>
        </View>
        <Text style={styles.contentText}>• {project.description}</Text>
      </View>
     ) )}
    </View>
    )}

    {/* Education */}
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Education</Text>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>Computer Science AND Business | Dandilton (Online)</Text>
          <Text style={styles.date}>May 2021 - Nov 2021</Text>
        </View>
        <Text style={styles.contentText}>• Studied Business Software planning, coordination, and efficiency</Text>
        <Text style={styles.contentText}>• Worked with various industries on launching efficient IT Systems</Text>
      </View>
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>Chemical Engineering | Royal Clickton</Text>
          <Text style={styles.date}>Jan 2014 - Sept 2018</Text>
        </View>
        <Text style={styles.contentText}>• GPA: 3.19</Text>
        <Text style={styles.contentText}>• Minor in Process Management</Text>
        <Text style={styles.contentText}>• Thesis in Modelling and Analysis of Process Efficiency in a Cement Plant</Text>
      </View>
    </View>

    {/* Work Experience */}
    {data?.professionalExperience && data.professionalExperience.length>1&&(
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Work Experience</Text>
      {data.professionalExperience.map((exp , index)=>(
      <View>
        <View style={styles.titleRow}>
          <Text style={styles.titleText}>{exp.company} | {exp.position}</Text>
          <Text style={styles.date}>{exp.duration}</Text>
        </View>
        <Text style={styles.contentText}>• {exp.description}</Text>
      </View>
      ))}
    </View>
    )}

    {/* Awards & Achievements */}
    {data?.additionalResponsibilities && data.additionalResponsibilities.length>1 &&(
    <View style={styles.awardList}>
    <Text style={styles.sectionTitle}>Awards & Achievements</Text>
    {data.additionalResponsibilities.map((additional , index)=>(
    <Text style={styles.contentText}>• {additional}</Text>
    ))}
  </View>
    )}

  </Page>
</Document>
);
};
  



const ReactPdfResumeTemplate3 = () => (
    <PDFViewer width={"100%"} height={"100%"}>
        <Resume />
    </PDFViewer>
  );

export default ReactPdfResumeTemplate3