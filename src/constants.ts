// charte graphique :

import { Molecule } from "./app/Model/Molecule";
import { Result } from "./app/Model/Result";
import { User } from "./app/Model/User";
import { Request } from "./app/Model/Request";
import { Target } from "./app/Model/Target";
import { Role } from "./app/Model/roles.enum";
import { Status } from "./app/Model/status.enum";

export const COLORS = {
    PURPLE: '#442578',
    LIGHT_PURPLE: '#d6d2e1',
    BLUE: '#1681A0',
    LIGHT_BLUE: '#7FB2C8',
    DARK_GREY: '#344A53',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
}



export const FONT = {
    FONT_FAMILY: 'Titillium Web, sans-serif',
    FONT_SIZE: '16px',
    FONT_WEIGHT: '400',
    FONT_WEIGHT_BOLD: '700',
    FONT_WEIGHT_LIGHT: '300',
    FONT_WEIGHT_THIN: '100',
}


// Sample users
export const users: User[] = [
    {
        id: 1,
        username: "user1",
        email: "user1@example.com",
        password: "password",
        salt: "salt",
        organisation: "Org1",
        role: Role.Admin,
        subscription: 5,
        image: "https://randomuser.me/api/portraits/women/1.jpg",
        phone: "123-456-7890",
        birthdate: new Date("2000-01-01T00:00:00Z"),
        facebooklink: "https://www.facebook.com/",
        twitterlink: "",
        linkedinlink: "https://www.linkedin.com/",
        created_at: "2022-03-20T15:25:00Z",
        updated_at: "2022-03-20T15:25:00Z",
        deleted_at: "null"
    },
    {
        id: 2,
        username: "user2",
        email: "user2@example.com",
        password: "password",
        salt: "salt",
        organisation: "Org2",
        role: Role.Client,
        subscription: -1,
        image: "https://randomuser.me/api/portraits/men/1.jpg",
        phone: "456-789-0123",
        birthdate: new Date("2000-01-01T00:00:00Z"),
        facebooklink: "",
        twitterlink: "https://twitter.com/",
        linkedinlink: "https://www.linkedin.com/",
        created_at: "2022-03-21T10:10:00Z",
        updated_at: "2022-03-21T10:10:00Z",
        deleted_at: "null"
    },
    {
        id: 3,
        username: "user3",
        email: "user3@example.com",
        password: "password",
        salt: "salt",
        organisation: "Org3",
        role: Role.Client,
        subscription: -2,
        image: "https://randomuser.me/api/portraits/women/2.jpg",
        phone: "789-012-3456",
        birthdate: new Date("2000-01-01T00:00:00Z"),
        facebooklink: "https://www.facebook.com/",
        twitterlink: "https://twitter.com/",
        linkedinlink: "https://www.linkedin.com/",
        created_at: "2022-03-22T09:45:00Z",
        updated_at: "2022-03-22T09:45:00Z",
        deleted_at: "null"
    }
];

// Sample molecules
export const molecules: Molecule[] = [
    {
        id: 1,
        formula: "C6H12O6",
        molecularWeight: 180.16,
        logP: -2.52,
        numHDonors: 5,
        numHAcceptors: 6,
        pIC50: 6.2,
        NumHeavyAtoms: 12,
        numChiralCentersList: 1,
        polarizabilities: 7.92,
        numRings: 1,
        rotableBonds: 4,
        created_at: "2022-03-20T15:25:00Z",
        updated_at: "2022-03-20T15:25:00Z",
        deleted_at: "null"
    },
    {
        id: 2,
        formula: "C16H18N2O4S",
        molecularWeight: 346.39,
        logP: 2.57,
        numHDonors: 2,
        numHAcceptors: 5,
        pIC50: 7.8,
        NumHeavyAtoms: 23,
        numChiralCentersList: 1,
        polarizabilities: 17.91,
        numRings: 2,
        rotableBonds: 6,
        created_at: "2022-03-21T10:10:00Z",
        updated_at: "2022-03-21T10:10:00Z",
        deleted_at: "null"
    },
    {
        id: 3,
        formula: "C27H36O8",
        molecularWeight: 488.57,
        logP: 4.87,
        numHDonors: 4,
        numHAcceptors: 8,
        pIC50: 8.2,
        NumHeavyAtoms: 35,
        numChiralCentersList: 1,
        polarizabilities: 26.46,
        numRings: 3,
        rotableBonds: 7,
        created_at: "2022-03-22T09:45:00Z",
        updated_at: "2022-03-22T09:45:00Z",
        deleted_at: "null"
    },

];

// Sample requests
export const requests: Request[] = [
    {
        id: 1,
        moleculeId: 1,
        userId: 1,
        targetId: 1,
        status: Status.Pending,
        created_at: "2022-03-20T15:25:00Z",
        updated_at: "2022-03-20T15:25:00Z",
        deleted_at: "null"
    },
    {
        id: 2,
        moleculeId: 2,
        userId: 2,
        targetId: 2,
        status: Status.Succeeded,
        created_at: "2022-03-21T10:10:00Z",
        updated_at: "2022-03-21T10:10:00Z",
        deleted_at: "null"
    },
    {
        id: 3,
        moleculeId: 3,
        userId: 3,
        targetId: 3,
        status: Status.Denied,
        created_at: "2022-03-22T09:45:00Z",
        updated_at: "2022-03-22T09:45:00Z",
        deleted_at: "null"
    },
    {
        id: 4,
        moleculeId: 2,
        userId: 1,
        targetId: 1,
        status: Status.Pending,
        created_at: "2022-03-23T09:45:00Z",
        updated_at: "2022-03-23T09:45:00Z",
        deleted_at: "null"
    }
];

// Sample results
export const results: Result[] = [
    {
        id: 1,
        targetId: 1,
        moleculeId: 1,
        active: false,
        confidence: 0.8,
        created_at: "2022-03-20T15:25:00Z",
        updated_at: "2022-03-20T15:25:00Z",
        deleted_at: "null"
    },
    {
        id: 2,
        targetId: 1,
        moleculeId: 4,
        active: true,
        confidence: 0.9,
        created_at: "2022-03-21T10:10:00Z",
        updated_at: "2022-03-21T10:10:00Z",
        deleted_at: "null"
    },
    {
        id: 3,
        targetId: 1,
        moleculeId: 3,
        active: true,
        confidence: 0.97,
        created_at: "2022-03-22T09:45:00Z",
        updated_at: "2022-03-22T09:45:00Z",
        deleted_at: "null"
    }
];

// Sample targets
export const targets: Target[] = [
    {
        id: 1,
        name: "Target1",
        description: "Target1 Description",
        created_at: "2022-03-20T15:25:00Z",
        updated_at: "2022-03-20T15:25:00Z",
        deleted_at: "null"
    },
]