import React, { useState, useEffect } from "react";
import FriendCard from "../../../components/friend/card";
import { useAppContext } from "../../../context/appContext";
import "./friend.scss";

const ALL_FRIENDS_TAB = 1;
const INVITATION_TAB = 2;
const SUGGESTIONS_TAB = 3;

function Friends() {
    const [tab, setTab] = useState(ALL_FRIENDS_TAB);
    const { user, listUsers, getAllUsers } = useAppContext();
    useEffect(() => {
        getAllUsers();
    }, []);
    return (
        <div className="friend-container col-8">
            <div className="friend-container__tabs">
                <div
                    className={
                        tab === ALL_FRIENDS_TAB ? "col-4 tab-active" : "col-4"
                    }
                    onClick={() => setTab(ALL_FRIENDS_TAB)}
                >
                    Tất cả bạn bè
                </div>
                <div
                    className={
                        tab === INVITATION_TAB ? "col-4 tab-active" : "col-4"
                    }
                    onClick={() => setTab(INVITATION_TAB)}
                >
                    Lời mời kết bạn
                </div>
                <div
                    className={
                        tab === SUGGESTIONS_TAB ? "col-4 tab-active" : "col-4"
                    }
                    onClick={() => setTab(SUGGESTIONS_TAB)}
                >
                    Gợi ý kết bạn
                </div>
            </div>
            <div className="friend-container__content">
                {tab !== ALL_FRIENDS_TAB
                    ? tab === INVITATION_TAB
                        ? listUsers.map(
                              (record) =>
                                  record.invitation_send.includes(user._id) && (
                                      <FriendCard
                                          data={record}
                                          tabStatus={tab}
                                      />
                                  )
                          )
                        : listUsers.map(
                              (record) =>
                                  !record.invitation_send.includes(user._id) &&
                                  !record.invitation_receive.includes(
                                      user._id
                                  ) &&
                                  !record.friends.includes(user._id) &&
                                  record.user._id !== user._id && (
                                      <FriendCard
                                          data={record}
                                          tabStatus={tab}
                                      />
                                  )
                          )
                    : listUsers.map(
                          (record) =>
                              record.friends.includes(user._id) && (
                                  <FriendCard data={record} tabStatus={tab} />
                              )
                      )}
            </div>
        </div>
    );
}
export default Friends;
