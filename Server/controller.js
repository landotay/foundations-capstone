let movies = require('./db.json')
   
module.exports = {
    getAllMovies: (req, res) => {
        console.log(movies)
     res.status(200).send(movies)
    },

    updateMovie: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = movies.findIndex(elem => elem.id === +id)

        if (movies [index].rating === 5 && type === 'plus'){
            res.status(400).send('cannot go above 5')
        }else if (type === 'plus'){
            movies[index].rating++
            res.status(200).send(movies)
        }else if (type === 'minus'){
            movies[index].rating--
            res.status(200).send(movies)
        }else if (movies [index].rating === 1 && type === 'minus'){
            res.status(400).send('Cannot go below 1')
        }else{
            res.status(400).send ('you broke something')
        }
    },
    movieTitle: (req, res)=>{
        const titles = ["Big Daddy",
            "Spy Kids 2: The Island of Lost Dreams",
            "The King of Staten Island",
            "Burt Wonderstone",
            "I Now Pronounce You Chuck & Larry",
            "The Big Lebowski",
            "Desperado",
            "Interview",
            "The Wedding Singer",
            "Airheads",
            "Living in Oblivion",
            "The Search for One Eye Jimmy"
       ]

       let randomIndex = Math.floor(Math.random() * titles.length);
       let randomMovieTitle = titles[randomIndex];
       
       res.send(randomMovieTitle);
             },
             login: async (req, res) => {
                const { username, password } = req.query
                let userTmp
                
                await SQL.query(`
                SELECT user_id,username,password
                FROM users
                WHERE username = '${username}';
                `).then(
                    dbRes => {
                        userTmp = dbRes[0]
                        console.log(`retrieved user with ID: ${userTmp[0].user_id}`)
                    }
                    ).catch(err => console.log(err))
                    
                try {
                    const verified = bcrypt.compareSync(password, userTmp[0].password)
                    
                    if(verified){
                        delete userTmp[0].password
                        console.log(`Logged in ${userTmp[0].username} with correct password.`)
                        res.status(200).send(userTmp)
                    }
                    else if(userTmp[0].username === '' || userTmp[0].password === ''){
                        res.status(400).send(`Username Or password cannot be empty.`)
                        console.log(`Username or Password was left empty, not logging in.`)
                    }
                    else{
                        res.status(400).send('Incorrect Password')
                        console.log(`Incorrect password for ${userTmp[0].username}, not logging in.`)
                    }
                } catch (err) {
                    console.log(err)
                    res.status(400).send(err)
                }
            },
            register: (req,res) => {
                let {username, password} = req.body
                const salt = bcrypt.genSaltSync(8)
                const passHash = bcrypt.hashSync(password, salt)
        
                SQL.query(`
                INSERT INTO users(username,password,isAdmin)
                VALUES('${username}', '${passHash}', False);
                `).then(
                    dbRes => {
                        res.status(200).send(`User ${username} created!`)
                    }
                ).catch(err => {
                    console.log(err)
                    res.status(202).send(err.errors[0].message)
                })
            }
}

