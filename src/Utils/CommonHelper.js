import {accepted, cancelled, delivering, received, rejected, responded, underReview} from "./Constants";


export const statusColorCode = (code) => {
    switch (parseInt(code)){
        case 1:
            return underReview;
        case 2:
            return responded;
        case 3:
            return accepted;
        case 4:
            return cancelled;
        case 5:
            return delivering;
        case 6:
            return received;
        case 7:
            return rejected;
    }
}

export const statusDisplayText = (code) => {
    switch (parseInt(code)){
        case 1:
            return 'Under Review';
        case 2:
            return 'Responded';
        case 3:
            return 'Accepted';
        case 4:
            return 'Cancelled';
        case 5:
            return 'Delivering';
        case 6:
            return 'Received';
        case 7:
            return 'Rejected';
    }
}
