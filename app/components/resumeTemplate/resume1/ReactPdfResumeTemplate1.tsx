import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Link } from '@react-pdf/renderer';
import { Certificate } from 'crypto';


const styles = StyleSheet.create({
  page: {
    padding: 40,
    color: 'black',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#004081', // Dark blue header color
    // marginBottom:5
  },
  contactInfo: {
    fontSize: 10,
    color: 'black',
    marginTop: 5,
  },
  line: {
    borderBottom: '2px solid #004081',
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
    color: '#004081',
    textTransform: 'uppercase',
    width: '25%', // Title on the left (30% of the width)
  },
  sectionContent: {
    fontSize: 10,
    width: '75%', // Content on the right (70% of the width)
    color: 'black',
    lineHeight: 1.4,
  },
  skills: {
    fontSize: 10,
    width: '70%', // Content on the right (70% of the width)
    color: 'black',
    lineHeight: 1.4,
    display: "flex",
    flexDirection: "row",
    gap: 2,
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  jobTitleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  jobTitle: {
    fontWeight: "extrabold",
    color: 'black',
    fontSize: 11
  },
  jobDate: {
    fontSize: 10,
    color: 'black',
  },
  bulletPoint: {
    marginLeft: 10,
    marginBottom: 4,
    fontSize: 10,
  },
  link: {
    color: '#004081',
    textDecoration: 'none',
  },
  workExperience: {
    marginBottom: 12, // Margin between different job experiences
  },
  education: {
    marginBottom: 12, // Margin between different education entries
  },
  hr: {
    borderBottom: '1.5px solid #004081',
    marginVertical: 10
  },
  section: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '70%', // Content on the right (70% of the width)
  },
  item: {
    width: '30%',
    fontSize: 10,
    marginBottom: 5,
  },
  Certificatesection:{
    display: 'flex',
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // flexWrap: 'wrap',
    width: '70%', // Content on the right (70% of the width)
    flex:1

  },
  certi: {
    // marginLeft: 10,
    marginBottom: 4,
    fontSize: 10,
  },


});
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
      InstitutionName: string;
      InstituteName: string;
      description: string;
      duration: string;
    }>;

    certifications: Array<{
      nameOfCertificates: string;
      durationOfCompletion: string;
    }>;
    awards: Array<{
      nameOfAward: string;
      duration: string;
    }>;
    roleCandidateDeserves: string;
  }>();


  useEffect(() => {
    const jsondata = localStorage.getItem("data");
    if (jsondata) {
      const data = JSON.parse(jsondata);
      console.log(data);

      setData(data);

    }
  }, []);
  const fliterresult = data?.professionalSkills.filter((word) => word.length < 25);
  console.log(fliterresult)

  return (

    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.header}>{data?.personalInfo.name}</Text>
          <Text style={styles.contactInfo}>
            {data?.personalInfo.email} | {data?.personalInfo.phone} | {data?.personalInfo.location}
          </Text>
        </View>




        {/* Summary */}
        {data?.professionalSummary && data?.professionalSummary.length > 0 && (
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
        {data?.professionalExperience && data.professionalExperience.length > 1 && (
          <>
            <View style={styles.hr} />
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Work Experience</Text>
              <View style={styles.sectionContent}>
                {
                  data.professionalExperience.map((exp, index) => (

                    <View style={{ ...styles.workExperience, }}>
                      <View style={{ ...styles.jobTitleRow, width: "100%", justifyContent: "space-between" }}>
                        <View style={{ width: "70%", display: "flex", flexDirection: 'row', }} >
                          <Text style={{ ...styles.jobTitle, }}>{exp.position}, {exp.company}</Text>
                        </View>
                        <View style={{ width: "30%", display: "flex", flexDirection: "row", justifyContent: "flex-end", }} >
                          <Text style={{ ...styles.jobDate, }}>{exp.duration}</Text>
                        </View>
                      </View>
                      {exp.description ?

                        <Text style={styles.bulletPoint}>• {exp.description}</Text>
                        : <></>
                      }
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
            {data?.academicQualifications && data.academicQualifications.length > 0 && (
              data.academicQualifications.map((academic, index) => (

                <View style={styles.education}>

                  <View style={{ width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", }}>

                    <View style={{ width: "70%", display: "flex", flexDirection: "row", alignItems: "flex-start" }} >
                      <Text style={styles.jobTitle}>{academic?.InstitutionName || academic?.InstituteName}</Text>
                    </View>

                    <View style={{ width: "30%", display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "flex-start" }} >
                      <Text style={styles.jobDate}>{academic.duration}</Text>
                    </View>


                  </View>
                  <Text style={styles.bulletPoint}>• {academic.description}</Text>
                </View>

              ))
            )}
          </View>
        </View>


        {/* Key Skills */}
        <View style={styles.hr} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Key Skills</Text>
          <View style={styles.section}>
            {

              fliterresult?.map((skill, index) => (
                <Text style={styles.item}>{skill}</Text>
              ))

            }
          </View>
        </View>
        {
          data?.certifications && data?.certifications.length>0 &&(
            <>
            <View style={styles.hr} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Certification</Text>
          <View style={styles.Certificatesection}>
            {
            
            data?.certifications?.map((certificate) => (
              <Text style={styles.certi}>{certificate.nameOfCertificate}</Text>
            ))
            
            }
          </View>
        </View>
            </>

          )
        }
        

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