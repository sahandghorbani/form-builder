'use client'
import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
    {
        id: 'gary',
        name: 'Gary Goodspeed',
        thumb: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAACAQMEBQYABwj/xABDEAABAwMCAwUDCAcGBwAAAAABAAIDBBEhBRIxQVEGEyJhcRQygQcjQnKRocHRM1JigpKTsRUkQ1Ph8BZEVFWDorL/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAJREAAgIBAwQDAAMAAAAAAAAAAAECEQMEEiETMUFRIjJhFEJx/9oADAMBAAIRAxEAPwC/7sEgDiosdTSz1UlLFPG6oizJE05aMWJHxH2qW2RpCymhva/tzrL+ewD7Ng/BfSSlTR4cIqSf4aN8KadEeXFTnZFkGzKsnuQjG62UmyynbEJYkBDskIUp0aaLLFAxhzUgCdIQJMAV10SRACLrrikQApSBcSkukBxQkIiUl0AIlsuCVMAC1AWp4ZXEYSoCMWoCpBCbcFLQxgrkbmpstQBdNkGLmyy/ZwNk7V6vMRdzS4A/vD8loQ6xBWb7KuvrWrP6yO/+ilP7RHj+sjYB6IOTLXJSVoQP713eKPuS7kDH94PFAS0lR3TMZlz2j1KZNfTg4mBPRuUrQ+WTHNa7ATbolDOpsB2sZI4/Vt/VC7UnhpIhOBzcEbkFMlFlihIsogrqh7Q5rYm363KaM9QXtaZ2gFpPhYluQUTSkuq9+6931Lz08QGVGY6naw97KSdx4yHqfNS5j2lyXNtxH2pp1RC33pYx6kKnlqtP2Pa18JfbyJTjtVoYsCS1hna1S8i9lLG/RYOq6YfTv6AlJ7Ww+7HKfRllUP1yleG7WyOs6/Bc/XoWgBsMh+xLqx9j6UvRbe1SXFqWQ+pA/FQNO1aprpKgNp2NbG/aN0hz9yhHXz9GAem5Vel6lJSGo2MaTI/d4uSiWZWuTSOF0+DW97VH6EQ/eJ/BI6erEjGiSLIJPzZ5fFZ467WO4Njb+6mn6xVFwc57W2BA2jqjrxF0JGocZSfFUEfVYB+abdG7iaibP1fyWWdq9WeNSWjlgJh+q1BBDqs2ItxAUvURKWCX4apsAdJLukmftcAPnD+qDy9UhpmdZf5jvzWQdqTrk+2OFzn5wps6mOdY7+YfzU/yI+iuhL2emuMbBd0jWgeaynZSoijrtTkcCWukJbsF75KWTXKdmI4Sf2n2CoNM1N2mulkD42h9rh/UdFUs63JkwxPa0b8akCCY4XEjgSbIDX1BeWgRsAANzlYaTtKA23tRFyTZjfNQZdf3G/zz/jZQ9WilpWegz1st2bqsNF+Vgo09dS7Hb6oud5OJXn79Zcctp7n9pyZdq9SfdDG/C6h6tFrS/p6AdVomAbWlzuu1MN1qNgc1kTj4ieNlgXV9a7PflvpZNOnnd70zyfrLN6t+DRaaPk3smtv3NcI2MsCPE5RpNdlJ8c8LGeQWHN3e89x9XEodrRzuoepmylp4I2UnaENwa5uMACyjSa/DxNTKT+zdZjwjklBbfgoeeTK6US/frlOc/OuPn/qmna5HbwQPPmbKmLhbCTfZT1JexqKLT+2LEllOL+bkDtaqLECJrb+d1XF56JNyW9+ytqJ39qVYb4RGPggfqdYf8UD0Chl9kgJkw0EnyS3SHSJJr6twt35Hon6uSVscQa97SRmx4oYtLkkiu6Sx6BBqe9oibfhzVLdTJdWhgyzc5ZP4ihIefee53q4lNDcebj8FwDjwD/4So5L4D29c+qTYOi7u5TwjlP7hSiCc8IZj/wCMoFaO2LtiX2ao/wAif+WV3s9R/kT/AMspchaO71z3jdI45HEqZqzheIEX978FuW/JVJTxPmqtTB7tpdtiitwF+ZTXZLspRdpKaaetMtoXANDHWvuFz/RdEcM2qM3OKPP4mvmftjYL9Ckk3xmzxa3Rel9reyWmdn9JZUUET2zOmDNznk4sfyWU0OLfqMTwLuEreV+al4WnTY1NPlFAxssn6ON7vqtJUmLTdSl/R0FU4eURC+iDRUsRs2CMcsMC72eH08gFutIvZm87XZHgUPZjXZvc02o+Nh+Kmw9h+0EguaVjfJ8ll7caVp4E2SGjFsFaLSY/LIeon4R49D8nesuzJJTM8txKlxfJtWH9LqEQ8msP5r1B0BafJAY7LRaXEZvPkPO2/Ju0D5zUnfusCdZ8nVE33q6ocfJrfyW+LAhMatafEvBHWyezFM7A6S33palx+tZON7D6I3OyYnzlK1xhumjTm+Cr6ONeCerk9maHZDQ2/wDKX9XXRt7NaMzhQQ/EK/MDuWUJgePop9KC7InqTfkpnaNpkbCY6GnBAwdi89kj7ypklLWgud9EWC9SqIXCJ9x9ErzhsdwVzaiMeKOjTyk7sbvsj4E+S0nY+GOWCoMsTHEPA8QvbCz2x7gQxrnW6BaPsu72WGZk/gc5wIBPkssLW7k0yp7ODQeyU4/wIv4Au9lp+ULP4QkEgIuHbrru8Xd8fBwvcu4XcM5RsHwCXYB9Bn2BDvPRcXJ8E8iuYCMtb9iZMbb+6PsTu5AXlAG21aobHpNa4xkFtPIb/ulZL5IhCNGrBKP8Zo4fspdU1l8uiVpbKHxvpn2cHXDrtPBVvydVjqfTqlvMzXsfRczhbqzvjm4touPlYZANApjG4EuqgLfuOXm/ZeIv1GFg4umYFs/lDrHVGl0sbrC0xP8A6lZHsq4RapTSObcNnYVjOLUqNYTjM93k01/EZUSaklbxabeisY9eoXYdG5qlN1XTntsX29WlT18se8TR48Uuxm3New2yh3OHFXVX7BUyQMZO0F0nC9rp86GJG3jey553vhWtZH+yozlpH4ZQYIuSi7mncPeddXh7OG2ZhfpZQJ9JlhfsErT6BUtVjfkhaefornU8PIuv5pl9Pty0p+ujNJG4ucHEFouHdXAfim9w9Pit4zT7GUsbTpojOid1VbrWqQ6RROnqMDgPNXYIvled/KvUFrKSC/hLXO+8D8EsmTbFtExxbmrJ2n9rJtVdINM0iqqhEBuETNxb6p49oK5pIk7P6oLdKKQqJ8jNbTaW7WZayrgp22iG6aQNB944uvSf+JtMlYe4kqKkgkf3ankk+8CywWWbVhNRjKqPP5e0oMbmv0rVY3FpFzRvFvuWPmNLCAaiofDf/Ogey/2r13U+1QpIjING1NzBYb5Ie7HlfcvOPlO1Cv1Z+m08ujT0jy9z2B7muMnLg2/UKMk21dl4ftVFIXzzNLqGppnwsGS15BHwsob6iscSGSsPWz8rqHTNRo6uKpMLWGN5LxutvzwPTmFaTVrWRSio08bhBUbS5gcNznhzD5BouL3XOoqXfg7upKPCIlNrU1OQ1zi0gcCtDpGvNlsKgeHqqmMaDVSVcE0ckDZHB1LPtAdEbDB8rqqe2bTJ+6ntb6MjcscPI/gnunj5ixOMMqqSPUIzG9gdGdzTwISO2hY/RNcfARd4LOBB5rWQTQ1cQfE71B5L0MWdTR52bTvGI4jkmyU46PomjG661swPPYNTdTskgpan5qZpDoHg2NxkjoVdaDrlFpdO6GpfIxz3bhtj3C3BY+mlLqhjS0ceKKvkImaOWwLy1mlFWj0pY1Lg1+r61T6pAxkEhfsJJ3NsoejztpqqN7yNjZASb8FRac+7ZApjXWp5fqlWsrl8mJQ28HqVPr2nyGza6nN84kF1YRVsbxdlQwjyIK8MDsZH3IhO5nBzm26OT/mPs0R0PTPcp5j39KS8/pMG3kpDa6SOR16h4BIA8WBheKUur6lC9nc1c+Ddmb/cVc0ur63VHbLVnHElgJ+5WssZ+A2yiu566K2Rp3OqXEj9ooDq1Rdu2d2ZNuT5Feef2xqDtsRqoibeDezDlArdZ7RRiwdtYwlwMTQc+pynLYuaHGeT2em6hWS+zFx2EukjztvfxtUllUW7ge7Avw2grxKXXtWmAE1dUYN7b7ZHD70LtZ1J2XV09vrqHlj6K+flntr6kG12x8eIAC8t+VeQGupCM/MH095UB1avOPbJj6vUaqlfVt/vLnyYsC48FnLMnGhpPcmwdGra2lrmVVC+SOeNwc1zBcC33L13sz2y1kQyvro6Sz/FmM3eQABm+OAXj0N4Dene+M3uC15wVJOpV+f79VZ4/Of6IhOCXyQpxbfxZ6f2h7VaxqNM6LuaGSkfYl0Qc2QEZAsSQsL227Q6rW1umPr4YYpWUpLWxNcCGuNiDc8fAqqCurtxYyumb3js3IIv1tZFqUNXWyRvra10r4WbWFzgNrenBE5JxpFQhTsmQak57Q8yCzwDnj9imM1BoIaLEDy4rHvjfDba8Gwta6fpql4d4gVipM6X+mk1allrZ3V0LzLK7L2HifT8lUNqXvjkp3ucxpOY3eXVT6Ot22Idw4qfNBQ6htfOLTDhI3B+KbViToqtOZIbjG0G4Jwr6jq5KZzXlxAuA4+XVAylZE0AWLRwsEbtlrY9OquCcXZnke5UXL9a03iKuIg87nKaOtaf/wBXF96yz+08MMj4pNLYCw2w5vL4If8Aium/7YPtb+S6+uvZw9B+jOUl/aWf75ItQzKz6qSm/Tt+P9EdbfvW26LgX0Oz+wNE4Bzmk2upwNqaTxclCio5JSMcVYMpBCwe1THaPotyVUE2gZCha6Q2a0uv5KYKWKGwqZHNdyY3JP5J+N5ce7oowxnNwyT6kqdSUcURJO18h+ICqOLkTYNFSB7Q5zGws5NGXn1KtIxG1uxt2i+CG2TYGLAImDxC5XTGNIzYtaxjt0cbsgAtJGboaDVBK4wVA+dbjJ4+i6f9JuVdqEG200Y2uGT1Q3XIUmW08NFUe+0D4WVXUaREbuhlt5J6iqW1DQxxtKPsKld2QeNvgpajIStGdmoZ4zgC3VR3Ncw2cHA+YWpLWnBJ+xR5aON4twHQDCyeJeC1Izd8oS5W82lXywfY633KvmoJAcWPrhZSxtFWNU7j7TH9ZWc8TJ8uJFuhsqunikjqmd40gA8bYVo2xHFVBcOxWQ5qBhttlfx5qDK18Mm0uuOSuZS0NvcKor2l0jSOmCnKCq0WpvyHHK9pxe/NWFNUvuMqKyMPja/gSMp2MtBGPislZp3NBTVG5oDiDdHIMkjPSyq4XltiDdToqgW6rVPwS0ZbWY+71CXGHeO/+/O6gq97SRNLYp2/UcPJUbnC+MYWUu4E+no5NwdgnoprYmsaRM4AH6LcpJ6sCzYmhvl1TIbJM4cc8lsqSpGVj3ftDBHC0C3EhOQ0cktnSux06J+ko2xt3PHwUoYw0YWiixNiRRNjFmNTsbQBcrm4RcVohBtxwuiZlxwbBC0o2Gwd5pgA8bmk5wlDQ+JwfbqCV0hFyAeSbbJbB4XugRWzRmGTFwL3BHFWdDVNqGhsmJBj1TVVE2e+bcwVWm8b7OJa5vAhZfUbSaNA5hachDZM0NcJmiOU7Zev6ylOvyN1f+Edu41ZC6ON2HMB9U6QeaSyQ7IclBER4LsPQHCiyUMrLuADh+wVakDmk8KTRVmelpJJnDc+1jhriulpZ2C5i3m2CTdXz2RvFntaUw6lbY7Hll+XEJbQTKCOV28xvFrcBZE9pZYjICtJ6Q7fHG14HNvFQZBYWIt5LnlBo2g74G4qrbgqbDOHHBCp5LtfYBPQyFpRZRPrwZqeRlr3Fx6jKz7ZLDLLrUU4Eo4i9uCp9QpJIap4hjLmO8QsOHkkwY/TUpdY29bqyhhYxvCx6lGyzGZGeSTJK6lGjnuwicW5JW8VwNku4dFQB3HVEwgFNtcDyTgItwTQBlwIwiGRlNbgcJwOaBlACPtfBTQsHo3PHQJouz7oCAHSQ4Wt6KDXM74iQNy0WNlKY4bhcri0NfYjBKUlwBVMJsCCW9CrmhrRMGxSkCTkf1lU1EZimePoXwhaTgg+YKzi6G42aWwJKF1goWn1wmGyUjvRi/6ymuxyWl2ZVQ2TdNuRuva9k3c9Ei0citdB4uQ+1cd+LAIAKwUaupfaIS0Wa76Lk/udza1c57wOAtzRw1Q06M2+MtcWSgte3BBTV7H0VrrFO4xickbhjCqHOAwSuWSpm6domU1SWOv5Ip9Ti3+Itvbqqaaci7WlRdzjk5KhsZs73KJqaCcau05grpQUK4JjHGYCNAOCW6aA7mjcQg4onIAQoSlJQkpMBCQMpw+NtwU0QHYOV0Z2iwFkvI+KAqG95E6PBfxF1XDe3BZbPXgrQg3uDYqNW09m99HxHvNHNRJcghgEsNwbO8lc6fqAnAimAEnXqqFhxg8eXRF5gkEdElJoGkzTvjt6Jlwso+naj3zRFNiS2D+spZY51zyWncz7DNxdKkLbJL2QWKQCM8lAfqtFE6xqG4NiBlHqneGgm7u+7biyxjrcissmRx7FxjZd61qcc3cNp5A5o8Trf0VRLOXnGAmUi55ScmaJVwLz4rki5SM2ISgoV113HMHuRNKbGUYwExjgK66AFddFgOgriUAK4lOwFJSXQpLpALeyUIBkrgTeyAHeRXRkObZ3xCEHCQHa66TAhVdOYZCWjwFNA4VtMxs0ZHEH7lTuHdvdGQQWnmoKQQ94EEi3MK30/UO8Ahlw/kf1lTAgi44JbkG4NvNCdCas0jwLpshQ9Oru8+ZlNnfRP6ynHzWl2SMvy1zSLhwsViq+nNLVSRHgHYPULcFQdSoYq5ln+F491w5LLJG0XGVGMXJ6qgfSzOilHibzHApkrlfBscuXLkAa4FKgBsFwNyu45h0FKShC4lAC7l25CuQMcDrJSU24+EeqW5ugAiUl0l0l0AFcXSXyhJSXSsB0FKeCa3I9wsmAUL7Xa42HVRK9jHxmZjtzmcRfinibZzZHT2zjP2KZDRURvLh9/onBchPVcIhlu33XZGfuTLjbjg9BwUlCHlY2PVWWn128CKZ3znI9VW+qDP0ePIoumKjSHHvYQuNri11E0+u7wCGf3+Ad1U0m49CtLTJ7FH2ipDJE2pj95gs8dQs6Ra9uF1uZWtexzHC4cLFYusgNNUPhP0TjzC5ssadmsGMrly5ZFn//2Q=='
    },
    {
        id: 'cato',
        name: 'Little Cato',
        thumb: 'data:image/jpeg;base64,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'
    },
    {
        id: 'kvn',
        name: 'KVN',
        thumb: 'data:image/jpeg;base64,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'
    },
    {
        id: 'mooncake',
        name: 'Mooncake',
        thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxLbQ5X5Puk60heaxWFeyjCG5tY9N29gzQBJgotnE5JmO8D-4nLMD0EAbgnQ&s'
    },
    {
        id: 'quinn',
        name: 'Quinn Ergon',
        thumb: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRgYSk05hQZ-4KvesqAls5RbYmtjEpSzKINVm3Jdkqg_IylAeQMXGQf9i3-Q&s'
    }
];

function DraggableList() {
    const [characters, updateCharacters] = useState(finalSpaceCharacters);

    function handleOnDragEnd(result:any) {
        if (!result.destination) return;
        const items = Array.from(characters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        console.log(items)
        updateCharacters(items);
    }

    return (
        <div className="App">
            <header className="App-header">
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId="characters">
                        {(provided) => (
                            <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                                {characters.map(({ id, name, thumb }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => (
                                                <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                    <div className="characters-thumb">ovided.dragHandleP
                                                        <img src={thumb} alt={`${name} Thumb`} />
                                                    </div>
                                                    <p>
                                                        {name}
                                                    </p>
                                                </li>
                                            )}
                                        </Draggable>
                                    );
                                })}
                                {provided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </header>
            <p>
                Images from <a href="https://final-space.fandom.com/wiki/Final_Space_Wiki">Final Space Wiki</a>
            </p>
        </div>
    );
}

export default DraggableList;