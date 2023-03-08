export interface ResumeType {
  resumeId: string,
  title: string,
  lastModified: Date,
  sections: SectionType[] | null //list of component database id for that resume
  // grid: GridType[] | null,
}

// export interface databaseIdType {
//   databaseId: string,
// } 

export interface SectionType {
  componentId: string,
  header: string,
  bullets: string
}

export interface ProfileType {
  name: string,
  location: string,
  email: string,
  linkedin: string,
  jobTitle: string,
  additional: string,
}

export interface GridType{
  gridId: number,
  resumeId: number,
  componentId: number,
  x_coordinate: number,
  y_coordinate: number,
}

export interface initialStateType {
  userId: number,
  grids: GridType[],
  currentResume: ResumeType | null,
  resumes: ResumeType[] | null,
  sections: SectionType[] | null,
  profile: ProfileType
}