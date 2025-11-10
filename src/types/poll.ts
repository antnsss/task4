export interface Question {
text: string
options: string[]
votes: number[]
}


export interface Poll {
id?: string
title: string
questions: Question[]
createdAt: { seconds: number; nanoseconds: number } | string | number
}