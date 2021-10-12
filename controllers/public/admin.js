const Contents = require('../../models/about');
const Education = require('../../models/education');
const Work = require('../../models/work');
const Skills = require('../../models/skills');
const Projects = require('../../models/projects');
const Contact = require('../../models/contact');

// Admin Controllers
exports.getAdmin = (req, res, next) => {
    res.render('admin/admin', {
       pageTitle: 'Login',
       path: '/admin' 
    });
};



// About Controllers
exports.getEditAbout = (req, res, next) => {
    Contents.fetchContents(contents => {
        res.render('admin/public/about', {
            pageTitle: 'Edit About',
            path: '/admin/about',
            imgs: contents
        });
    });
};

exports.postEditAbout = (req, res, next) => {
    const content1 = req.body.content1;
    const content2 = req.body.content2;
    const updatedContents = new Contents(
        content1,
        content2
    );
    updatedContents.save();
    res.redirect('/admin');
};



// Education Controllers
exports.getEducation = (req, res, next) => {
    Education.fetchAll(education => {
        res.render('admin/public/education', {
            pageTitle: 'Admin Education',
            path: '/admin/education',
            eds: education
        });
    });
};

exports.getAddEducation = (req, res, next) => {
    res.render('admin/public/add-education', {
        pageTitle: 'Add Education',
        path: '/admin/add-education',
        editing: false
    });
};

exports.postAddEducation = (req, res, next) => {
    const order = req.body.order;
    const school = req.body.school;
    const date = req.body.date;
    const degree = req.body.degree;
    const description = req.body.description;
    const education = new Education(null, order, school, date, degree, description);
    education.save();
    res.redirect('/admin/education');
};

exports.getEditEducation = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const eduId = req.params.educationId;
    Education.findById(eduId, education => {
        if (!education) {
            return res.redirect('/');
        }
        res.render('admin/public/add-education', {
            pageTitle: 'Edit Education',
            path: '/admin/edit-education',
            editing: editMode,
            ed: education
        });
    });
};

exports.postEditEducation = (req, res, next) => {
    const id = req.body.educationId;
    const order = req.body.order;
    const school = req.body.school;
    const date = req.body.date;
    const degree = req.body.degree;
    const description = req.body.description;
    const updatedEducation = new Education(
        id,
        order,
        school,
        date,
        degree,
        description
    );
    updatedEducation.save();
    res.redirect('/admin/education');
};

exports.postDeleteEducation = (req, res, next) => {
    const eduId = req.body.educationId;
    Education.deleteById(eduId);
    res.redirect('/admin/education');
};



// Work Controllers
exports.getWork = (req, res, next) => {
    Work.fetchAll(work => {
        res.render('admin/public/work', {
            pageTitle: '/Admin Work',
            path: '/admin/work',
            wrks: work
        });
    });
};

exports.getAddWork = (req, res, next) => {
    res.render('admin/public/add-work', {
        pageTitle: 'Add Work',
        path: '/admin/add-work',
        editing: false
    });
};

exports.postAddWork = (req, res, next) => {
    const order = req.body.order;
    const company = req.body.company;
    const date = req.body.date;
    const title = req.body.title;
    const description = req.body.description;
    const work = new Work(null, order, company, date, title, description);
    work.save();
    res.redirect('/admin/work');
};

exports.getEditWork = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const workId = req.params.workId;
    Work.findById(workId, work => {
        if (!work) {
            return res.redirect('/');
        }
        res.render('admin/public/add-work', {
            pageTitle: 'Edit Work',
            path: '/admin/edit-work',
            editing: editMode,
            wrk: work
        });
    });
};

exports.postEditWork = (req, res, next) => {
    const id = req.body.workId;
    const order = req.body.order;
    const company = req.body.company;
    const date = req.body.date;
    const title = req.body.title;
    const description = req.body.description;
    const updatedWork = new Work(
        id,
        order,
        company,
        date,
        title,
        description
    );
    updatedWork.save();
    res.redirect('/admin/work');
};

exports.postDeleteWork = (req, res, next) => {
    const workId = req.body.workId;
    Work.deleteById(workId);
    res.redirect('/admin/work');
};



// Skills Controllers 
exports.getEditSkills = (req, res, next) => {
    Skills.fetchAll(skills => {
        res.render('admin/public/skills', {
            pageTitle: 'Edit Skills',
            path: '/admin/skills',
            skillNames: skills.skillNames,
            skillPercents: skills.skillPercents
        });
    });
    
};

exports.postEditSkills = (req, res, next) => {
    const skillNames = req.body.skillNames;
    const skillPercents = req.body.skillPercents;
    const updatedSkills = new Skills(
        skillNames,
        skillPercents
    );
    updatedSkills.save();
    res.redirect('/admin');
};



// Projects Controllers
exports.getProjects = (req, res, next) => {
    Projects.fetchAll(projects => {
        res.render('admin/public/projects', {
            pageTitle: 'Projects',
            path: '/admin/projects',
            projects: projects
        });
    });
};

exports.getAddProject = (req, res, next) => {
    res.render('admin/public/add-project', {
        pageTitle: 'Add Project',
        path: '/admin/add-project',
        editing: false
    });
};

exports.postAddProject = (req, res, next) => {
    const order = req.body.order;
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const project = new Projects(null, order, title, image, description);
    project.save();
    res.redirect('/admin/projects');
};

exports.getEditProject = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        res.redirect('/');
    }
    const projId = req.params.projectId;
    Projects.findById(projId, project => {
        if (!project) {
            return res.redirect('/');
        }
        res.render('admin/public/add-project', {
            pageTitle: 'Edit Project',
            path: '/admin/edit-project',
            editing: editMode,
            project: project
        });
    });
};

exports.postEditProject = (req, res, next) => {
    const id = req.body.projectId;
    const order = req.body.order;
    const title = req.body.title;
    const image = req.body.image;
    const description = req.body.description;
    const updatedProject = new Projects(
        id,
        order,
        title,
        image,
        description
    );
    updatedProject.save();
    res.redirect('/admin/projects');
};

exports.postDeleteProject = (req, res, next) => {
    const projId = req.body.projectId;
    Projects.deleteById(projId);
    res.redirect('/admin/projects');
};



// Contact Controllers
exports.getEditContact = (req, res, next) => {
    Contact.fetchAll(contact => {
        res.render('admin/public/contact', {
            pageTitle: 'Edit Contacts',
            path: '/admin/contact',
            contacts: contact
        });
    });
    
};

exports.postEditContact = (req, res, next) => {
    const quote = req.body.quote;
    const location = req.body.location;
    const email = req.body.email;
    const phone = req.body.phone;
    const updatedContact = new Contact(
        quote,
        location,
        email,
        phone
    );
    updatedContact.save();
    res.redirect('/admin');
};