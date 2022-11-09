class Instagram {

    constructor() {
        // Write code here...
        this.following = {};
        this.photos = {};
        this.livefeeds = {};
        this.pastfeeds = {};
    }

    postPhoto(userId, photoId) {
        // Write code here...
        if( this.photos[userId]){
             this.photos[userId].unshift(photoId)
             this.livefeeds[userId].unshift(photoId)
        if(this.following[userId]){
             for( let i = 0; i < this.following[userId].length;i++){
                  let currentId = this.following[i]
                  this.livefeeds[currentId].unshift(photoId)
                  if(this.livefeeds[currentId].length > 10) {
                       this.livefeeds[currentId].pop()
                    }
                }
            }
        }else{
            this.photos[userId] = [photoId]
            this.livefeeds[userId]= [photoId]
        }

        return null
    }

    getFeed(userId) {
        // Write code here...
       let feeds = this.livefeeds[userId]
       while(feeds.length < 10 && this.pastfeeds[userId] !== undefined && this.pastfeeds[userId].length!== 0){
              feeds.push(this.pastfeeds[userId].shift())
       }   
       return feeds
    }

    follow(followerId, followeeId) {
        // Write code here..
        if(this.following[followeeId]){

             this.following[followeeId].push(followerId)

            }else{
                this.following[followeeId] = [followerId]
            }

            this.livefeeds[followerId].unshift(...this.photos[followeeId])
            
            while(this.livefeeds[followerId].length > 10){
              if(!this.pastfeeds[followerId]) this.pastfeeds[followerId] = [this.livefeeds[followerId].pop()]
              this.pastfeeds[followerId].unshift(this.livefeeds[followerId].pop())
            }
            return null
      }

    unfollow(followerId, followeeId) {
        // Write code here..
       let followeePhotoIdArr = this.photos[followeeId]
       let newlivefeeds = []
       let newpastfeeds = []
       for(let i = 0; i < this.following[followeeId].length;i++){
                if(followerId === this.following[followeeId][i]){
                    this.following[followeeId].splice(i,1)
                }
        }
       for(let i = 0 ; i < this.livefeeds[followerId].length;i++){
                let photoId = this.livefeeds[followerId][i]
                if(followeePhotoIdArr.includes(photoId) === false){
                     newlivefeeds.push(photoId)
               }
          }

       for(let i = 0;i < this.pastfeeds[followerId].length;i++){
              let photoId = this.pastfeeds[followerId][i]
              if(followeePhotoIdArr.includes(photoId) === false){
                   newpastfeeds.push(photoId)
              }
        }
            this.livefeeds[followerId] = newlivefeeds
            this.pastfeeds[followerId] = newpastfeeds
            return null
       }
}

// Test Case
const instagram = new Instagram();

// instagram.postPhoto(1,11) // User with id=1 posts a photo with id=11
// instagram.getFeed(1) // returns [11]
// instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
// instagram.getFeed(1) // returns [11]
// instagram.follow(1,2) // User 1 follows User 2
// instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
// instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
// instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
// instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
// instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
// instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
// instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
// instagram.getFeed(2) // returns [12]
// instagram.follow(2,3) // User 2 follows User 3
// instagram.getFeed(2) // returns [19, 18, 17, 16, 15, 14, 13, 12]
// instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
// instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
// instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
// instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
// instagram.follow(2,4) // User 2 follows User 4
// instagram.getFeed(2) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
// instagram.unfollow(2,3) // User 2 unfollows User 3
// instagram.getFeed(2) // returns [ 23, 22, 21, 20, 12 ]
// instagram.unfollow(2,4) // User 2 unfollows User 4
// instagram.getFeed(2) // returns [ 12 ]

console.log(instagram.postPhoto(1,11)) // User with id=1 posts a photo with id=11
console.log(instagram.getFeed(1)) // returns [11]
console.log(instagram.postPhoto(2, 12)) // User with id=2 posts a photo with id=12
console.log(instagram.getFeed(1)) // returns [11]
console.log(instagram.follow(1,2))// User 1 follows User 2
console.log(instagram.postPhoto(3, 13)) // User with id=3 posts a photo with id=13
console.log(instagram.postPhoto(3, 14))// User with id=3 posts a photo with id=14
console.log(instagram.postPhoto(3, 15)) // User with id=3 posts a photo with id=15
console.log(instagram.postPhoto(3, 16))// User with id=3 posts a photo with id=16
console.log(instagram.postPhoto(3, 17))// User with id=3 posts a photo with id=17
console.log(instagram.postPhoto(3, 18)) // User with id=3 posts a photo with id=18
console.log(instagram.postPhoto(3, 19)) // User with id=3 posts a photo with id=19
console.log(instagram.getFeed(2)) // returns [12]
console.log(instagram.follow(2,3)) // User 2 follows User 3
console.log(instagram.getFeed(2))// returns [19, 18, 17, 16, 15, 14, 13, 12]
console.log(instagram.postPhoto(4, 20)) // User with id=4 posts a photo with id=20
console.log(instagram.postPhoto(4, 21)) // User with id=4 posts a photo with id=21
console.log(instagram.postPhoto(4, 22))// User with id=4 posts a photo with id=22
console.log(instagram.postPhoto(4, 23)) // User with id=4 posts a photo with id=23
console.log(instagram.follow(2,4)) // User 2 follows User 4
console.log(instagram.getFeed(2)) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
console.log(instagram.unfollow(2,3)) // User 2 unfollows User 3
console.log(instagram.getFeed(2)) // returns [ 23, 22, 21, 20, 12 ]
console.log(instagram.unfollow(2,4)) // User 2 unfollows User 4
console.log(instagram.getFeed(2)) // returns [ 12 ]
