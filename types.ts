export interface ResumeType {
  resume_id: string,
  title?: string,
  last_modified: Date,
  sections: SectionType[] | null //list of component database id for that resume
  // grid: GridType[] | null,
}

// export interface databaseIdType {
//   databaseId: string,
// } 

export interface SectionType {
  component_id: string,
  header: string,
  bullets: string
}

export interface ProfileType {
  name: string,
  location: string,
  email: string,
  linkedin: string,
  job_title?: string,
  additional?: string,
}

export interface GridType{
  grid_id: number,
  resume_id: number,
  component_id: number,
  x_coordinate: number,
  y_coordinate: number,
}

export interface initialStateType {
  user_id: number,
  grids: GridType[],
  current_resume: ResumeType | null,
  resumes: { [key:number]: ResumeType},
  sections: SectionType[] | null,
  profile: ProfileType
}