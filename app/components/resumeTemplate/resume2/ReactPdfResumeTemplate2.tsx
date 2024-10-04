import React, { useEffect, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
} from "@react-pdf/renderer";
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

// Define styles to match the resume with colors, lines, and layout
// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
  },
  headerSection: {
    marginBottom: 2,
  },
  name: {
    fontSize: 24,
    color: "#1e62cb",
    fontWeight: 900,
    marginVertical: 2,
  },
  title: {
    fontSize: 12,

    fontWeight: "bold",
    color: "black",
  },
  contactInfo: {
    fontSize: 10,
    marginTop: 2,
    color: "gray",
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "ultrabold",
    color: "#1e62cb",
  },
  contentText: {
    fontSize: 10,
    marginBottom: 5,
    lineHeight: 1.3,
  },
  hr: {
    marginBottom: 5,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#1e62cb",
  },
  boldText: {
    fontSize: 10,
    fontWeight: "bold",
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
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5, // Added padding to job container
  },
  projectHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 5, // Added padding to job container
  },
  jobTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 3,
    marginTop: 3,
    marginRight: 10,
  },
  jobDate: {
    fontSize: 10,
    fontWeight: "bold",
  },
  jobPosition: {
    fontSize: 10,
  },
  projectTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 2,
    marginTop: 2,
    marginRight: 10,
  },
  projectDate: {
    fontSize: 10,
    fontWeight: "bold",
  },
  eduContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    // paddingBottom: 5, // Added padding to education container
  },
  eduTitle: {
    fontSize: 11,
    fontWeight: "bold",
    marginBottom: 1,
    marginTop: 2,
    marginRight: 10,
  },
  eduDate: {
    fontSize: 10,
    fontWeight: "bold",
  },
  eduPoints: {
    fontSize: 10,
    marginBottom: 2,
    paddingLeft: 10, // Added padding to list items
    // paddingBottom: 3,
  },
  techSkillsContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  skillItem: {
    width: "30%",
    fontSize: 10,
    marginBottom: 5,
  },
  additionalInfoTitle: {
    fontSize: 10,
    fontWeight: "bold",
  },
  lang: {
    fontWeight: "ultrabold",
    fontSize: 11,
  },
  common: {}
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
      InstituteName: string;
      description: string;
      duration: string;
    }>;

    certifications: Array<{
      description: string;
      // durationOfCompletion: string;
    }>;
    awards: Array<{
      nameOfAward: string;
      duration: string;
    }>;
    roleCandidateDeserve: string;

    Languages: Array<string>;
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
      <Page style={styles.page}>
        {/* Header section */}
        <View style={styles.headerSection}>
          <Text style={styles.name}>{data?.personalInfo.name}</Text>
          <Text style={styles.title}>{data?.roleCandidateDeserve}</Text>
          <Text style={styles.contactInfo}>
            {data?.personalInfo.location} | {data?.personalInfo.phone} |{" "}
            {data?.personalInfo.email}{" "}
            {data?.sociallinks.map((link, index) => (
              <Link
                style={{ textDecoration: "none", color: "gray" }}
                src={link.url}
              >
                <Text>| {link.platform} </Text>
              </Link>
            ))}
          </Text>
        </View>

        {/* Summary section */}
        {data?.professionalSummary && data?.professionalSummary.length > 0 && (
          <View>
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>SUMMARY</Text>
            <View style={styles.hr} />
            <Text style={styles.contentText}>{data?.professionalSummary}</Text>
          </View>
        )}

        {/* Technical Skills section */}
        {data?.professionalSkills && data.professionalSkills.length > 0 && (
          <View>
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>TECHNICAL SKILLS</Text>
            <View style={styles.hr} />

            <View style={styles.techSkillsContainer}>
              {(data?.professionalSkills || []).map((skills: any) => {
                return <Text style={styles.skillItem}>{skills}</Text>;
              })}
            </View>
          </View>
        )}

        {/* Professional Experience section */}
        {data?.professionalExperience &&
          data.professionalExperience.length > 0 && (
            <>
              <View style={styles.hr} />
              <Text style={styles.sectionTitle}>PROFESSIONAL EXPERIENCE</Text>
              <View style={styles.hr} />

              {/* Experience 1 */}
              {data?.professionalExperience.map((company: any, index) => (
                <View style={styles.jobContainer}>
                  <View style={styles.jobHeader}>
                    <Text style={styles.jobTitle}>
                      {company.company} : {company.position}
                    </Text>
                    <Text style={styles.jobDate}>{company.duration}</Text>
                  </View>
                  {/* <Text style={styles.jobPosition}>{company.position}</Text> */}
                  <Text style={styles.listText}>
                    {company.description ? <>{company.description}</> : ""}
                  </Text>
                </View>
              ))}
            </>
          )}
        {/* Education section */}
        {data?.academicQualifications &&
          data.academicQualifications.length > 0 && (
            <>
              <View style={styles.hr} />
              <Text style={styles.sectionTitle}>EDUCATION</Text>
              <View style={styles.hr} />
              {data.academicQualifications.map((academic, index) => (
                <>
                  <View style={styles.eduContainer}>
                    <Text style={styles.eduTitle}>{academic.InstituteName}</Text>
                    <Text style={styles.eduDate}>{academic.duration}</Text>
                  </View>
                  <Text style={styles.listText}>{academic.description}</Text>
                </>
              ))}
            </>
          )}

        {data?.projects && data.projects.length > 0 && (
          <>
            {/* Projects */}
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>PROJECTS</Text>
            <View style={styles.hr} />
            {data.projects.map((project: any) => (
              <View style={styles.projectContainer}>
                <View style={styles.projectHeader}>
                  <Link
                    style={{ textDecoration: "none", color: "black" }}
                    src={project.url}
                  >
                    <Text style={styles.projectTitle}>{project.name}</Text>
                  </Link>
                  <Text style={styles.projectDate}>{project.date}</Text>
                </View>
                <View style={{ display: "flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "flex-start", marginLeft: 5 }} >
                  <Text style={{ fontSize: 10 }}>•</Text>
                  <Text style={styles.listText}>{project.description}</Text>
                </View>
              </View>
            ))}
          </>
        )}

        {/* Additional Information section */}

        {data?.certifications && data.certifications.length > 0 && (
          <>
            <View style={styles.hr} />
            <Text style={styles.sectionTitle}>ADDITIONAL INFORMATION</Text>
            <View style={styles.hr} />
            <Text style={styles.contentText}>
              {data.Languages.length > 0 && (
                <>
                  <Text style={styles.lang} >langauges :</Text>

                  {
                    data.Languages.map((lang, index) => (
                      <Text> {lang} </Text>

                    ))}
                </>
              )}
            </Text>
            <Text style={styles.contentText}>
              {data.certifications.length > 0 && (
                <>
                  <View>
                    <Text style={styles.lang} >Certifications :</Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "column", width: "100%" }} >

                    {
                      [...data.certifications, ...data.certifications].map((certificate, index) => (
                        <Text> {certificate.description} </Text>

                      ))}
                  </View>
                </>

              )}
            </Text>
          </>
        )}
      </Page>
    </Document>
  );
};

const ReactPdfResumeTemplate2 = () => (
  <PDFViewer width={"100%"} height={"100%"}>
    <Resume />
  </PDFViewer>
);

export default ReactPdfResumeTemplate2;
