import http from 'k6/http';
import { sleep } from 'k6';

// let dummyReview = (id) => {
//   return {
//     "product_id": id,
//     "rating": 3,
//     "summary": "k6 test review",
//     "body": "adfuheqrguegrugrenjgfjnfgjnfaff aadfsjfdkjdfasjkldfasjkladfsj",
//     "recommend": true,
//     "name": "k6",
//     "email": "notReal@notReal.com",
//     "photos": [],
//     "characteristics": {
//         "Fit": 4,
//         "Length": 4,
//         "Comfort": 4,
//         "Quality": 4,
//     }
//   }
// };

const dummyReview = {
    "product_id": 1000,
    "rating": 3,
    "summary": "k6 test review",
    "body": "adfuheqrguegrugrenjgfjnfgjnfaff aadfsjfdkjdfasjkldfasjkladfsj",
    "recommend": true,
    "name": "k6",
    "email": "notReal@notReal.com",
    "photos": [],
    "characteristics": {
        "Fit": 4,
        "Length": 4,
        "Comfort": 4,
        "Quality": 4,
    }
};

export const options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 333,
      timeUnit: '1s',
      duration: '30s',
      preAllocatedVUs: 100,
      maxVUs: 200,
    },
  },
};

export default function () {
  let product_id = Math.floor(Math.random() * 1000011);
  http.get(`http://127.0.0.1:3000/SDC/api/reviews/?product_id=${product_id}`);
  http.get(`http://127.0.0.1:3000/SDC/api/reviews/meta/?product_id=${product_id}`);
  http.post(`http://127.0.0.1:3000/SDC/api/reviews/?product_id=${1000}`, JSON.stringify(dummyReview), { headers: { 'Content-Type': 'application/json' } });
}
