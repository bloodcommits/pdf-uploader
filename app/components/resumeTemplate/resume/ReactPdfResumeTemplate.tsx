import React, { useEffect, useState } from 'react';
import {
  Text,
  Font,
  Page,
  View,
  Image,
  Document,
  StyleSheet,
  PDFViewer,
  Link,
} from '@react-pdf/renderer';

import Header from './Header';
import Skills from './Skills';
import Education from './Education';
import Experience from './Experience';
import Title from './Title';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // '@media max-width: 400': {
    //   flexDirection: 'column',
    // },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    // width: 170,
    paddingTop: 30,
    paddingRight: 15,
    // '@media max-width: 400': {
    //   width: '100%',
    //   paddingRight: 0,
    // },
    // '@media orientation: landscape': {
    //   width: 200,
    // },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 15,
    paddingTop: 5,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
});
const headerStyles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 24,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
});
const skillsStyles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 11,
    marginBottom: 10,
  },
  skills: {
    fontFamily: 'Lato',
    fontSize: 10,
    marginBottom: 10,
  },
});
const titleStyles = StyleSheet.create({
  title: {
    fontFamily: 'Lato Bold',
    fontSize: 14,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
});
const listStyles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
    fontSize: 10,
    fontFamily: 'Lato',
  },
});
const experienceStyles = StyleSheet.create({
  container: {
    // flex: 1,
    paddingTop: 10,
    // paddingLeft: 15,
    // '@media max-width: 400': {
    //     paddingTop: 10,
    //     paddingLeft: 0,
    // },
  },
  entryContainer: {
    marginBottom: 5,
  },
  date: {
    fontSize: 11,
    fontFamily: 'Lato Italic',
  },
  detailLeftColumn: {
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
  },
  detailRightColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  bulletPoint: {
    fontSize: 10,
  },
  details: {
    fontSize: 10,
    fontFamily: 'Lato',
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    flexGrow: 9,
  },
  rightColumn: {
    flexDirection: 'column',
    flexGrow: 1,
    alignItems: 'flex-end',
    justifySelf: 'flex-end',
  },
  title: {
    fontSize: 11,
    color: 'black',
    textDecoration: 'none',
    fontFamily: 'Lato Bold',
  },
});
const educationStyles = StyleSheet.create({
  container: {
    marginBottom: 10,
  },
  school: {
    fontFamily: 'Lato Bold',
    fontSize: 10,
  },
  degree: {
    fontFamily: 'Lato',
    fontSize: 10,
  },
  candidate: {
    fontFamily: 'Lato Italic',
    fontSize: 10,
  },
});

Font.register({
  family: 'Open Sans',
  src: `https://fonts.gstatic.com/s/opensans/v17/mem8YaGs126MiZpBA-UFVZ0e.ttf`,
});

Font.register({
  family: 'Lato',
  src: `https://fonts.gstatic.com/s/lato/v16/S6uyw4BMUTPHjx4wWw.ttf`,
});

Font.register({
  family: 'Lato Italic',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u8w4BMUTPHjxsAXC-v.ttf`,
});

Font.register({
  family: 'Lato Bold',
  src: `https://fonts.gstatic.com/s/lato/v16/S6u9w4BMUTPHh6UVSwiPHA.ttf`,
});

const Resume = (props: any) => {

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
    <Page {...props} style={styles.page}>
      <View style={headerStyles.container}>
        <View style={headerStyles.detailColumn}>
          <Text style={headerStyles.name}>{data?.personalInfo?.name}</Text>
          <Text style={headerStyles.subtitle}>{""}</Text>
        </View>
        <View style={headerStyles.linkColumn}>
          <Link href={`mailto:${data?.personalInfo?.email}`} style={headerStyles.link}>
            {data?.personalInfo?.email}
          </Link>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.leftColumn}>
          {/* <Image
            src="https://react-pdf.org/static/images/luke.jpg"
            style={styles.image}
          /> */}
          <View>
            <Text style={titleStyles.title}>Skills</Text>
            <View>
              <Text style={skillsStyles.title}>Professional skills</Text>

              {[
                ...data?.professionalSkills || []
              ].map((skill: any) => {

                return (<View style={listStyles.item}>
                  <Text style={listStyles.bulletPoint}>•</Text>
                  <Text style={listStyles.itemContent}>{skill}</Text>
                </View>)
              })}

            </View>
          </View>
        </View>
        <View style={experienceStyles.container}>
          <Title>Experience</Title>
          {[
            ...data?.professionalExperience || []
          ].map(({ company, description, duration, position }) => (
            <View style={experienceStyles.entryContainer}>
              <View style={experienceStyles.headerContainer}>
                <View style={experienceStyles.leftColumn}>
                  <Text style={experienceStyles.title}>{`${company} | ${position}`}</Text>
                </View>
                <View style={experienceStyles.rightColumn}>
                  <Text style={experienceStyles.date}>{duration}</Text>
                </View>
              </View>
              <>
                {/* {details.map((detail: any) => ( */}
                <View style={listStyles.item}>
                  <Text style={listStyles.bulletPoint}>•</Text>
                  <Text style={listStyles.itemContent}>{description}</Text>
                </View>
                {/* ))} */}
              </>
            </View>
          ))}
        </View>

        <View style={experienceStyles.container}>
          <Title>Projects</Title>
          {[
            ...data?.projects || []
          ].map(({ date, description, name, url }) => (
            <View style={experienceStyles.entryContainer}>
              <View style={experienceStyles.headerContainer}>
                <View style={experienceStyles.leftColumn}>
                  <Text style={experienceStyles.title}>{`${name}`}</Text>
                </View>
                <View style={experienceStyles.rightColumn}>
                  <Text style={experienceStyles.date}>{date}</Text>
                </View>
              </View>
              <>
                {/* {details.map((detail: any) => ( */}
                {
                  description &&
                  <View style={listStyles.item}>
                    <Text style={listStyles.bulletPoint}>•</Text>
                    <Text style={listStyles.itemContent}>{description}</Text>
                  </View>
                }
                {/* ))} */}
              </>
            </View>
          ))}
        </View>

        <View style={educationStyles.container}>
          <Title>Education</Title>
          {
            [...data?.academicQualifications || []].map(((item) => {
              return <Text style={{ ...educationStyles.candidate, marginBottom: 5, }}>{item}</Text>
            }))
          }
          {/* <Text style={educationStyles.degree}>Jedi Master</Text> */}
          {/* <Text style={educationStyles.candidate}>A long, long time ago</Text> */}
        </View>
      </View>
    </Page>
  )
};

const ReactPdfResumeTemplate = () => (
  <PDFViewer width={"100%"} height={"100%"}>


    <Document
      author="Luke Skywalker"
      keywords="awesome, resume, start wars"
      subject="The resume of Luke Skywalker"
      title="Resume"
    >
      <Resume size="A4" />
      {/* <Resume orientation="landscape" size="A4" /> */}
      {/* <Resume size={[380, 1250]} /> */}
    </Document>
  </PDFViewer>
);

const experienceData = [
  {
    company: 'Jedi Temple, Coruseant',
    date: 'A long time ago...',
    details: [
      'Started a new Jedi Temple in order to train the next generation of Jedi Masters',
      'Discovered and trained a new generation of Jedi Knights, which he recruited from within the New Republic',
      'Communicates with decesased Jedi Masters such as Anakin Skywalker, Yoda, Obi-Wan Kenobi in order to learn the secrets of the Jedi Order',
    ],
    position: 'Head Jedi Master',
  },
  {
    company: 'Rebel Alliance',
    date: 'A long time ago...',
    details: [
      'Lead legions of troops into battle while demonstrating bravery, competence and honor',
      'Created complicated battle plans in conjunction with other Rebel leaders in order to ensure the greatest chance of success',
      'Defeated Darth Vader in single-combat, and convinced him to betray his mentor, the Emperor',
    ],
    position: 'General',
  },
  {
    company: 'Rebel Alliance',
    date: 'A long time ago...',
    details: [
      'Destroyed the Death Star by using the force to find its only weakness and delivering a torpedo into the center of the ship',
      'Commanded of squadron of X-Wings into battle',
      'Defeated an enemy AT-AT single handedly after his ship was destroyed',
      'Awarded a medal for valor and bravery in battle for his successful destruction of the Death Star',
    ],
    position: 'Lieutenant Commander',
  },
  {
    company: 'Tatooine Moisture Refinery',
    date: 'A long time ago...',
    details: [
      'Replaced damaged power converters',
      'Performed menial labor thoughout the farm in order to ensure its continued operation',
    ],
    position: 'Moisture Farmer',
  },
];

export default ReactPdfResumeTemplate;