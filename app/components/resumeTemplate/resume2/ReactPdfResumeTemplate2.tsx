import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import { link } from 'fs';
import { textDecorationLine } from 'html2canvas/dist/types/css/property-descriptors/text-decoration-line';
import { color } from 'html2canvas/dist/types/css/types/color';


// Define styles to match the resume with colors, lines, and layout
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  headerSection: {
    marginBottom: 10,
  },
  name: {
    fontSize: 24,
    color: '#1a73e8',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
    color: 'black',
  },
  contactInfo: {
    fontSize: 10,
    marginTop: 5,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1a73e8',
  },
  contentText: {
    fontSize: 10,
    marginBottom: 10,
    lineHeight: 1.3,
  },
  hr: {
    marginBottom: 5,
    marginTop: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#1a73e8',
  },
  boldText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  listText: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10, // Added padding to list items
    paddingBottom: 3,
  },
  jobContainer: {
    marginBottom: 5,
  },
  projectContainer: {
    marginBottom: 5,
  },
  jobHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5, // Added padding to job container
  },
  projectHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 5, // Added padding to job container
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 3,
    marginRight: 10,
  },
  jobDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  jobPosition: {
    fontSize: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 2,
    marginTop: 2,
    marginRight: 10,
  },
  projectDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eduContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
    paddingBottom: 5, // Added padding to education container
  },
  eduTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    marginBottom: 3,
    marginTop: 3,
    marginRight: 10,
  },
  eduDate: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  eduPoints: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10, // Added padding to list items
    paddingBottom: 3,
  },
  techSkillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    justifyContent: 'space-between',

  },
  skillItem: {
    fontSize: 10,
    marginBottom: 5,
  },
  additionalInfoTitle: {
    fontSize: 10,
    fontWeight: 'bold',
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
  return (

    <Document>
      <Page style={styles.page}>
        {/* Header section */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{data?.personalInfo.name}</Text>
          <Text style={styles.title}>UX DESIGNER</Text>
          <Text style={styles.contactInfo}>
            {data?.personalInfo.location} | {data?.personalInfo.phone} | {data?.personalInfo.email} {data?.sociallinks.map((link, index) => (

              <Link style={{ textDecoration: "none", color: "gray" }} src={link.url}>
                <Text>| {link.platform} </Text>
              </Link>
            ))}
          </Text>
        </View>

        {/* Summary section */}
        {data?.professionalSummary && data?.professionalSummary.length > 1 && (
          <View>
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <View style={styles.hr} />
            <Text style={styles.contentText}>
              {data?.professionalSummary}
            </Text>
          </View>)}

        {/* Technical Skills section */}
        {data?.professionalSkills && data.professionalSkills.length > 1 && (
          <View>
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            <View style={styles.hr} />

            <View style={styles.techSkillsContainer}>
              {(data?.professionalSkills || []).map((skills: any) => {
                return (
                  <Text style={styles.skillItem}>• {skills}</Text>
                )
              })}

            </View>
          </View>
        )}


        {/* Professional Experience section */}
        {data?.professionalExperience && data.professionalExperience.length > 1 && (

          <View>
            {/* // have to  work on this */}
          </View>

        )}
        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
        <View style={styles.hr} />

        {/* Experience 1 */}
        {data?.professionalExperience.map((company: any, index) => (
          <View style={styles.jobContainer}>
            <View style={styles.jobHeader}>
              <Text style={styles.jobTitle}>{company.company} : {company.position}</Text>
              <Text style={styles.jobDate}>{company.duration}</Text>
            </View>
            {/* <Text style={styles.jobPosition}>{company.position}</Text> */}
            <Text style={styles.listText}>• {company.description}</Text>
          </View>
        ))}


        {/* Education section */}
        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>EDUCATION</Text>
        <View style={styles.hr} />

        <View style={styles.eduContainer}>
          <Text style={styles.eduTitle}>UX Industrial Basics and General Application</Text>
          <Text style={styles.eduDate}>(2016 - 2019)</Text>
        </View>
        <Text style={styles.listText}>
          University of Engineering UX Cohort{'\n'}
          <Text style={styles.eduPoints}>• Major in Automotive Technology {'\n'}</Text>
          <Text style={styles.eduPoints}>• Thesis on "Technological Advancements within the current Mechatronics Industry"</Text>
        </Text>

        <View style={styles.eduContainer}>
          <Text style={styles.eduTitle}>Bachelor of Design in Process Engineering</Text>
          <Text style={styles.eduDate}>(2014 - 2016)</Text>
        </View>
        <Text style={styles.listText}>
          Engineering University{'\n'}
          Relevant coursework in Structural Design and Project Management
        </Text>

        {/* Projects */}
        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>PROJECTS</Text>
        <View style={styles.hr} />
        {data?.projects && data.projects.length > 1 && (
          data.projects.map((project: any) => (
            <View style={styles.projectContainer}>
              <View style={styles.projectHeader}>
                <Link style={{ textDecoration: "none", color: "black" }} src={project.url}>
                  <Text style={styles.projectTitle}>{project.name}</Text>
                </Link>
                <Text style={styles.projectDate}>{project.date}</Text>
              </View>
              <Text style={styles.listText}>• {project.description}</Text>
            </View>
          ))
        )}




        {/* Additional Information section */}
        <View style={styles.hr} />
        <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
        <View style={styles.hr} />
        <Text style={styles.contentText}>
          <Text style={styles.additionalInfoTitle}>• Languages:</Text> English, French, Mandarin{'\n'}
          <Text style={styles.additionalInfoTitle}>• Certifications:</Text> Professional Design Engineer (PDE) License, Project Management Tech (PMT){'\n'}
          <Text style={styles.additionalInfoTitle}>• Awards/Activities:</Text> Most Innovative Employer of the Year (2021), Overall Best Employee Division Two (2024),
          Onboarding Project Lead (2023)
        </Text>
      </Page>
    </Document>
  )
};




const ReactPdfResumeTemplate2 = () => (
  <PDFViewer width={"100%"} height={"100%"}>
    <Resume />
  </PDFViewer>
);

export default ReactPdfResumeTemplate2