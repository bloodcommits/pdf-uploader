import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Font, Image, Link } from '@react-pdf/renderer';

Font.register({
  family: "Roboto",
  fonts: [

    {
      src: "/assets/fonts/Roboto-Bold.ttf",
      fontWeight: 900,
    },

    {
      src: "/assets/fonts/Roboto-Medium.ttf",
      fontWeight: 500,
    },
  ],

})
// not specified to ""

const styles = StyleSheet.create({
  page: {
    paddingVertical: 30,
  },
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 900,
    fontFamily: "Roboto",
    marginBottom: 10,
  },
  subHeader: {
    textAlign: 'center',
    fontSize: 12,
    marginBottom: 10,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily: "Roboto",
    marginBottom: 5,
    textTransform: 'uppercase',
    backgroundColor: '#d1e4e2',
    padding: 5,
    paddingHorizontal: 30,
  },
  section: {
    marginVertical: 3
  },
  contentText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.5,
  },
  technicalSkills: {

    marginVertical: 3,
  },
  skillList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  projectList: {
    marginVertical: 3,
  },
  project: {
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  titleRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,

  },
  titleText: {
    fontWeight: 500,
    fontFamily: "Roboto",
    fontSize: 12,
    marginBottom: 5,
  },
  date: {
    fontSize: 10,
    // fontStyle: 'italic',
    fontWeight: 500,
    fontFamily: "Roboto",
  },
  awardList: {
    marginVertical: 3

  },
  link: {
    color: 'black', // Standard blue for link
    textDecoration: 'none',
  },
  techSkillsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    flexDirection: "row",
    paddingHorizontal: 30,

  },
  skillItem: {

    width: '30%',
    fontSize: 10,
    marginBottom: 5,
  },
  experinceblock: {
    marginVertical: 2.5,
    paddingHorizontal: 30,
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
      InstituteName: string;
      description: string;
      duration: string;
    }>;

    certifications: Array<{
      description: string;
      durationOfCompletion: string;
    }>;
    awards: Array<{
      nameOfCertificate: string,
      duration: string
    }>;
    roleCandidateDeserve: string;
  }>();


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
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View>
          <Text style={styles.header}>{`${data?.personalInfo.name}`.toUpperCase()}</Text>
          <Text style={styles.subHeader}>{data?.personalInfo.location} | {data?.personalInfo.email} | <Link style={styles.link} src="https://gmail.com">{data?.personalInfo.phone}</Link></Text>

          {data?.roleCandidateDeserve && <Text style={{
            ...styles.subHeader, fontWeight: 500,
            fontFamily: "Roboto",
          }}>{data?.roleCandidateDeserve?.toUpperCase()}</Text>}

        </View>

        {/* Technical Skills */}
        {data?.professionalSkills && data.professionalSkills.length > 0 && (
          <View style={styles.technicalSkills}>
            <Text style={styles.sectionTitle}>Technical Skills</Text>
            <View style={styles.techSkillsContainer}>
              {(data?.professionalSkills || []).map((skills: any) => {
                return (
                  <Text style={styles.skillItem}>• {skills}</Text>
                )
              })}

            </View>
          </View>

        )}

        {/* Projects */}
        {data?.projects && data.projects.length > 0 && (
          <View style={styles.projectList}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {data.projects.map((project, index) => (
              <View style={styles.project}>
                <View style={styles.titleRow}>
                  <Text style={styles.titleText}> {project.name}  {project.url}</Text>
                  <Text style={styles.date}>{project.date}</Text>
                </View>
                <Text style={styles.contentText}>• {project.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Education */}

        {data?.academicQualifications && data.academicQualifications.length > 0 && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Education</Text>
              {data.academicQualifications.map((academic) => (
                <View style={{ paddingHorizontal: 30 }} >

                  <View style={styles.titleRow}>
                    <Text style={styles.titleText}> {academic.InstituteName}</Text>
                    <Text style={styles.date}> {academic.duration}</Text>
                  </View>
                  <Text style={styles.contentText}>• {academic.description}</Text>
                </View>
              ))

              }

            </View>
          </>
        )

        }

        {/* Work Experience */}
        {data?.professionalExperience && data.professionalExperience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {data.professionalExperience.map((exp, index) => (
              <View style={styles.experinceblock}>
                <View style={styles.titleRow}>
                  <Text style={styles.titleText}>{exp.company} | {exp.position}</Text>
                  <Text style={styles.date}>{exp.duration}</Text>
                </View>
                {
                  exp.description && (
                    <Text style={styles.contentText}> • {exp.description}</Text>
                  )
                }
              </View>
            ))}
          </View>
        )}

        {/* Awards & Achievements */}
        {data?.awards && data.awards.length > 0 && (
          <View style={styles.awardList}>
            <Text style={styles.sectionTitle}>Awards & Achievements</Text>
            {data.awards.map((award, index) => (
              <View style={{ ...styles.titleRow, paddingHorizontal: 30 }}>
                <Text style={styles.contentText}>• {award.nameOfCertificate}

                </Text>
                <Text style={styles.date}  >
                  {award.duration}</Text>
              </View>

            ))}
          </View>
        )}
        {data?.certifications && data.certifications.length > 0 && (
          <View style={styles.awardList}>
            <Text style={styles.sectionTitle}>Certifications</Text>
            {data.certifications.map((certi, index) => (
              <View style={{ ...styles.titleRow, paddingHorizontal: 30 }}>
                <Text style={styles.contentText}>• {certi.description}

                </Text>

              </View>

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