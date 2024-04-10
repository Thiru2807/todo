const express = require('express');
const cors  = require('cors');
const pool = require("./database");

const app = express();

app.use(express.json());
app.use(cors());
const router = express.Router();


// Sample JSON data
const jsonData = [
    {
        "ttp_id":1,
        "name": "TATIANA JAKOB",
        "email": "t.jakob@artofliving.de",
        "phone": "1702925569",
        "country": "Germany",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "Tatiana has been teaching the Happiness Program since 2005 and Sri Sri Yoga courses since 2008. She is teaching with so much love and at the same time with humor. Since 2017 she has been an active and important pillar in building up the Sri Sri School of Yoga in Europe. She is also an amazing trainer in the Sri Sri Yoga TTPs. I recommend her for the Sahaj Samadhi TTC. She will teach with honor, respect, and love to bring the meditation technique and this wonderful knowledge to the participants.",
        "evaluator_recommendation": null,
        "evaluator_remarks": "",
        "state": "Baden-Wurttemberg",
        "city": "Rosenfeld",
        "teacher_since": "2005-03-16",
        "teacher_type": "fulltime",
        "programs_taught": "blessing, sayam, part 2, sri sri yoga 1 and 2,upanayam , shiva deeksha, yes plus, inveling infinity1 and 2, shakti kriya,TRMs, guru pooja 1 and 2,SSYTTC  , eternity",
        "hp_last_year_count": 1,
        "pax_last_year_count": 12,
        "sahaj_program_count": 3,
        "sahaj_participant_count": 35,
        "guru_pooja_phase1": "Bad Antogast 2009 or 2010 I cant remember",
        "guru_pooja_phase2": "Bad Antogast 2012 August",
        "guru_pooja_audio_link": "https://drive.google.com/file/d/1x-rzdIB9-eEgf-ybVGWTbN0h2iVBs2Ua/view?usp=drive_link",
        "guru_pooja_video_link": "https://drive.google.com/file/d/1YAX9rIaPeuZ37CsXbuGeuJbKj2HrmEsf/view?usp=sharing",
        "harmony_email": "t.jakob@artofliving.de"
    },
    {
        "ttp_id":2,
        "name": "Barbara Leonhardt",
        "email": "bure.lion@gmail.com",
        "phone": "01136008850",
        "country": "Argentina",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "Barbara comes with enormous commitment from the first day I saw her enter The Art of Living. Constantly involved in Art of Living activities. ",
        "evaluator_recommendation": true,
        "evaluator_remarks": "Aa sound explained",
        "state": "Buenos Aires",
        "city": "Olivos",
        "teacher_since": "2009-09-07",
        "teacher_type": "parttime",
        "programs_taught": "happiness, yes, yes+, art excel, eternity",
        "hp_last_year_count": 5,
        "pax_last_year_count": 35,
        "sahaj_program_count": 2,
        "sahaj_participant_count": 10,
        "guru_pooja_phase1": "2008, Bangalore Ashram, Bhanu Didi",
        "guru_pooja_phase2": "2009, Chicago, Bhanu Didi",
        "guru_pooja_audio_link": "https://drive.google.com/file/d/11IjgVzdhtaTVyZOGjvuZ3vV_LKPWT9P-/view?usp=drive_link",
        "guru_pooja_video_link": "https://drive.google.com/file/d/16VfdMYb8JjM7G3awu8u6AhtV12U2-wzb/view?usp=drive_linkΩx zxc",
        "harmony_email": "bure.lion@gmail.com"
    },
    {
        "ttp_id":3,
        "name": "Saadia Ghany",
        "email": "saadiaghany@yahoo.com",
        "phone": "3549529",
        "country": "Trinidad & Tobago",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "When I think of all the people I have recommended to be Sahaj instructors over the years, I see no one so qualified and able to do this as Saadia. If you have any questions, please call me or write.",
        "evaluator_recommendation": true,
        "evaluator_remarks": "I loved the pace of Saadia’s chanting and her obvious devotion, nonetheless someone will have to sit with her and help her with the T and D sounds. ",
        "state": "Port of Spain",
        "city": "St Augustine",
        "teacher_since": "1999-12-10",
        "teacher_type": "fulltime",
        "programs_taught": "Happiness Program",
        "hp_last_year_count": 5,
        "pax_last_year_count": 20,
        "sahaj_program_count": 20,
        "sahaj_participant_count": 100,
        "guru_pooja_phase1": "2005 Rishikesh Bhanu Didi",
        "guru_pooja_phase2": " Repeated 2023 Online Bhanu Didi",
        "guru_pooja_audio_link": "https://drive.google.com/file/d/1jP7-8YVDs3-jDXV9eWMpqNGz9PY0w9hK/view?usp=drive_link",
        "guru_pooja_video_link": "https://drive.google.com/file/d/1pkY08LhLyIBwC5IHAd0MW1DfzskBssdH/view?usp=sharing",
        "harmony_email": "saadiaghany@yahoo.com"
    },
    {
        "ttp_id":4,
        "name": "Yelena Safarova",
        "email": "esafar64@mail.ru",
        "phone": "0557917462",
        "country": "Azerbaijan",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "Yes, Yelena is teacher in Art of Living from 2003. She is active in organisation as volunteer and teacher. She is part 2 course teacher also. She has done Guru Puja phase 1 and Guru Puja phase 2 as well. ",
        "evaluator_recommendation": true,
        "evaluator_remarks": "Problem with Aa sound. Corrected. ",
        "state": "Baki\\xa0[Baku]",
        "city": "Baku",
        "teacher_since": "2003-09-09",
        "teacher_type": "parttime",
        "programs_taught": "Part1, Part 2, SSY",
        "hp_last_year_count": 4,
        "pax_last_year_count": 32,
        "sahaj_program_count": 3,
        "sahaj_participant_count": 22,
        "guru_pooja_phase1": "2016 Banu didi",
        "guru_pooja_phase2": "2018 Banu didi",
        "guru_pooja_audio_link": "https://drive.google.com/file/d/15v3kM7dNDyljlbM9C9X8Zbc0uVtNKexO/view?usp=drive_link",
        "guru_pooja_video_link": "https://drive.google.com/file/d/15v3kM7dNDyljlbM9C9X8Zbc0uVtNKexO/view?usp=drive_link",
        "harmony_email": "esafar64@mail.ru"
    },
    {
        "ttp_id":1,
        "name": "Anne Mari Vihila",
        "email": "anne-mari.vihila@artofliving.se",
        "phone": "0704824160",
        "country": "Sweden",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "I highly recommend Anne-Mari to become a Sahaj Samadhi Meditation teacher. I have known her for the last 30 years and am very happy that she finally has a chance to do the course. I wish her all the best and every success. Jai Guru Dev, Kiran",
        "evaluator_recommendation": true,
        "evaluator_remarks": "Bit of a problem with her wrist due to a recent surgery, it’s getting betterSmall tweaks in the pronounciation are done. ",
        "state": "Stockholms län",
        "city": "Stockholm",
        "teacher_since": "1998-01-15",
        "teacher_type": "parttime",
        "programs_taught": "Happiness Program",
        "hp_last_year_count": 2,
        "pax_last_year_count": 46,
        "sahaj_program_count": 5,
        "sahaj_participant_count": 18,
        "guru_pooja_phase1": "March 2016 Bangalore Ashram Bhanu Didi",
        "guru_pooja_phase2": "October 2017 Bangalore Ashram Bhanu Didi",
        "guru_pooja_audio_link": "https://drive.google.com/drive/folders/1n-DRqjl7fzEivgbGh6QnZDpF6SmgG2Ow?usp=sharing",
        "guru_pooja_video_link": "https://drive.google.com/file/d/1uPZHATWefQZkJoMMYIh09B9VH1WdvsOJ/view?usp=sharing",
        "harmony_email": "Anne-mari.vihila@artofliving.se"
    },
    {
        "ttp_id":1,
        "name": "Amol Sarnaik",
        "email": "amol@uk.artofliving.org",
        "phone": "7469163969",
        "country": "United Kingdom",
        "teacher_recommendation": true,
        "recommending_teacher_remarks": "Amol is a sincere and dedicated teacher. His passion and commitment to teach, reflects in the regularity of courses he undertakes - irrespective of whether he is travelling or moving homes. He is a humble devotee and remains in gratitude and awe of much he has grown, with the presence of Gurudev. He will be a wonderful asset to AOL as a Sahaj Samadhi Meditation teacher. Heartily recommend my fellow devotee. ",
        "evaluator_recommendation": true,
        "evaluator_remarks": "Yes with condition - if incorporates all the corrections given in the feedback.",
        "state": "London",
        "city": "London",
        "teacher_since": "2012-08-01",
        "teacher_type": "parttime",
        "programs_taught": "YesPlus, Happiness Program, Happiness Program Online",
        "hp_last_year_count": 10,
        "pax_last_year_count": 32,
        "sahaj_program_count": 11,
        "sahaj_participant_count": 43,
        "guru_pooja_phase1": "Oct 2012, Bangalore Ashram, Bhanumathi Narasimhan",
        "guru_pooja_phase2": "Oct 2013, Bangalore Ashram, Bhanumathi Narasimhan",
        "guru_pooja_audio_link": "https://drive.google.com/file/d/1l2f0VuiSt1dvySfEMAL4IBQaW_-gi0BC/view?usp=sharing",
        "guru_pooja_video_link": "https://drive.google.com/file/d/1rct1D9HvD1PV5oa8C2OY01gCpLojux3x/view?usp=sharing",
        "harmony_email": "amol@uk.artofliving.org"
    }
];
router.get('/data', (req, res) => {
    res.json(jsonData);
    console.log(jsonData);
});


router.get("/gettodo", (req, res) => {
    pool.query('SELECT * FROM todo;')
        .then((response) => {
            console.log('Todo list retrieved successfully');
            console.log(response.rows);
            res.json(response.rows); // Sending the todo items as JSON
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error retrieving todo list");
        });
});

router.get("/gettodo/:id", (req, res) => {
    const userId = req.params.id;
    pool.query(`SELECT * FROM todo WHERE user_id = ${userId};`)
        .then((response) => {
            console.log('Todo list retrieved successfully');
            console.log(response.rows);
            res.json(response.rows);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error retrieving todo list");
        });
});

router.post("/addtodo", (req,res) => {
    const title = req.body["title"];
    const user_id = req.body["user_id"];

    console.log("Todo List Title is " + title);
    console.log("Todo List User Id is " + user_id);

    const insertSTMT = `INSERT INTO todo (title,user_id) VALUES ('${title}','${user_id}');`;

    pool.query(insertSTMT).then((response)=>{
        console.log('Data Inserted');
        console.log(response);
    }).catch((err)=>{
        console.log(err);
    });

    console.log("Response is"+req.body);
    res.send("Responce received : " + req.body);
});

router.put("/updatetodo/:id", (req, res) => {
    const todoId = req.params.id;
    const complete = req.body.complete;

    const updateSTMT = `UPDATE todo SET complete = ${complete} WHERE id = ${todoId};`;

    pool.query(updateSTMT)
        .then((response) => {
            console.log('Todo item updated successfully');
            console.log(response);
            res.send("Todo item updated successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error updating todo item");
        });
});

router.delete("/deletetodo/:id", (req, res) => {
    const todoId = req.params.id;

    const deleteSTMT = `DELETE FROM todo WHERE id = ${todoId};`;

    pool.query(deleteSTMT)
        .then((response) => {
            console.log('Todo item deleted successfully');
            console.log(response);
            res.send("Todo item deleted successfully");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error deleting todo item");
        });
});

module.exports = router;