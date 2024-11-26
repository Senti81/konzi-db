import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const SingleEvent = ({ event }) => {

  const { user } = useAuth()

  const formatDate = (d) => {
    return new Date(d).toLocaleDateString('de-DE', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <Link
      to={`/events/${event.id}`}
      className="list-group-item list-group-item-action d-flex gap-1 p-1 align-items-center"            
      state={{ event }}
    >
      {event.userId === user?.uid ? (
        <img
          src={user?.photoURL}
          alt="profilePic"
          className="profile-pic"
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
        />
        ) : (
        <svg width="32" height="32" viewBox="0 0 1024 1024" className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M160.832 521.536l-17.216 11.392-36.032 33.664M153.984 519.744l-25.792 21.76c-10.88 9.344-27.456 23.296-27.456 23.296" fill="#D94437" />
          <path d="M469.184 814.464c0.64-26.432-10.752-88.832 32.96-132.928 44.992-45.504 137.024-58.624 143.04-63.68 16.256-14.784 22.848-33.728 27.584-53.12-45.504 15.04-110.528-34.176-148.48-114.24-23.936-50.56-10.304-123.264-2.56-160.576-26.88-6.848-53.248-4.608-80.064 17.984-21.696 18.368-40.64 78.272-86.208 124.224-64 64.64-153.92 65.664-190.336 86.464-13.696 6.272-31.04 18.88-47.808 35.776a229.76 229.76 0 0 0-24 28.672 171.2 171.2 0 0 0 15.488 225.856l69.312 68.608a171.52 171.52 0 0 0 220.096 17.728c9.984-6.016 21.888-14.976 33.856-26.176 24.32-22.72 40.064-46.208 37.12-54.592z" fill="#D94437" />
          <path d="M454.464 694.336c3.648-6.912 13.888-23.296 38.016-47.616 21.056-21.44 79.168-36.352 81.984-38.72 7.744-6.976 5.632-17.728 7.808-26.944-21.504 7.104-75.648-43.264-93.568-81.024-11.264-23.808-16.704-37.952-12.992-55.552-12.608-3.2-12.416 1.024-25.024 11.712-10.24 8.64-19.136 36.864-40.64 58.56-31.04 31.36-79.616 37.76-89.152 43.968l-26.24 16.448c-32.512 32.32-32.512 85.824-0.832 117.12l32.64 32.384a80.832 80.832 0 0 0 114.176-0.64l13.824-29.696z" fill="#FBE9EB" />
          <path d="M455.616 635.2l-48.384-47.808 432.384-426.112 37.632 37.248z" fill="#5B4037" />
          <path d="M846.592 256.512l-78.784-43.968 124.8-115.648 73.344 38.784z" fill="#5A4035" />
          <path d="M278.912 647.488l101.312 100.288-28.416 28.8-101.312-100.352zM332.992 592.832l101.312 100.224-30.848 31.168L302.08 624z" fill="#4B5359" />
        </svg> 
        )      
      }

      <div className="d-flex w-100 justify-content-between">
        <div>
          <h6 className="mb-0">{event.band}</h6>
          <p className="mb-0 opacity-75">
            <small>{event.stadt}, {event.location}</small>
          </p>
        </div>
        <small className="text-nowrap align-self-center opacity-75">
          {formatDate(event.datum)}      
        </small>
      </div>
    </Link>
  )
}

export default SingleEvent