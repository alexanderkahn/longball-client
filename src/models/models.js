// @flow

//TODO: get this from the server, not directly from firebase. Will look like the other models
export type User = {
    name: string
}

export type CurrentView = {
    isFetching: boolean,
    isEdit: boolean,
    lastUpdated: number
}

export type League = {
    id: string,
    attributes: {
        name: string
    }
}

export type Team = {
    id: string,
    attributes: {
        abbreviation: string,
        location: string,
        nickname: string
    }
}

export type Person = {
    id: string,
    attributes: {
        first: string,
        last: string
    }
}

export type RosterPosition = {
    id: string
}

export type Player = {
    rosterPosition: RosterPosition,
    person: Person
}
