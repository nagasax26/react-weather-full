import React from 'react';
import CommentForm from './CommentForm';
import CommentListBox from './CommentListBox';

const WeatherBox = ({ id, name, icon, feelslike_c, text, comments, removeWeather, addComment, removeComment }) =>
    (
        <div className="weather">
            <div className="weather__box">
                <div className="weather__icon-box">
                    <img className="weather__icon" src={icon} alt={text} />
                </div>

                <div className="weather__info-box">
                    <p>{name}</p>
                    <p>{text} - {feelslike_c} | C</p>
                </div>
                <div className="weather__icon-box weather--right">
                    <i onClick={() => {
                        removeWeather(id);
                    }} className="fa fa-2x fa-trash"></i>
                </div>
            </div>
            <div className="weather__box">
                <CommentForm id={id} addComment={addComment} />
            </div>
            <div className="weather__box">
                <CommentListBox removeComment={removeComment} weatherId={id} comments={comments} />
            </div>
        </div>
    );

export default WeatherBox;