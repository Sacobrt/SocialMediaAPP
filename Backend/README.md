<a name='assembly'></a>
# SocialMediaAPP

## Contents

- [AgeValidator](#T-SocialMediaAPP-Validations-AgeValidator 'SocialMediaAPP.Validations.AgeValidator')
  - [#ctor(minimumAge)](#M-SocialMediaAPP-Validations-AgeValidator-#ctor-System-Int32- 'SocialMediaAPP.Validations.AgeValidator.#ctor(System.Int32)')
  - [IsValid(value,validationContext)](#M-SocialMediaAPP-Validations-AgeValidator-IsValid-System-Object,System-ComponentModel-DataAnnotations-ValidationContext- 'SocialMediaAPP.Validations.AgeValidator.IsValid(System.Object,System.ComponentModel.DataAnnotations.ValidationContext)')
- [AuthorizationController](#T-SocialMediaAPP-Controllers-AuthorizationController 'SocialMediaAPP.Controllers.AuthorizationController')
  - [#ctor(context,mapper)](#M-SocialMediaAPP-Controllers-AuthorizationController-#ctor-SocialMediaAPP-Data-SocialMediaContext,AutoMapper-IMapper- 'SocialMediaAPP.Controllers.AuthorizationController.#ctor(SocialMediaAPP.Data.SocialMediaContext,AutoMapper.IMapper)')
  - [GenerateToken(opt)](#M-SocialMediaAPP-Controllers-AuthorizationController-GenerateToken-SocialMediaAPP-Models-DTO-OperatorDTO- 'SocialMediaAPP.Controllers.AuthorizationController.GenerateToken(SocialMediaAPP.Models.DTO.OperatorDTO)')
- [CellData](#T-SocialMediaAPP-Controllers-CellData 'SocialMediaAPP.Controllers.CellData')
  - [CellBgColor](#P-SocialMediaAPP-Controllers-CellData-CellBgColor 'SocialMediaAPP.Controllers.CellData.CellBgColor')
  - [CellDown](#P-SocialMediaAPP-Controllers-CellData-CellDown 'SocialMediaAPP.Controllers.CellData.CellDown')
  - [CellLeft](#P-SocialMediaAPP-Controllers-CellData-CellLeft 'SocialMediaAPP.Controllers.CellData.CellLeft')
  - [CellNumber](#P-SocialMediaAPP-Controllers-CellData-CellNumber 'SocialMediaAPP.Controllers.CellData.CellNumber')
  - [CellRight](#P-SocialMediaAPP-Controllers-CellData-CellRight 'SocialMediaAPP.Controllers.CellData.CellRight')
  - [CellUp](#P-SocialMediaAPP-Controllers-CellData-CellUp 'SocialMediaAPP.Controllers.CellData.CellUp')
- [Comment](#T-SocialMediaAPP-Models-Comment 'SocialMediaAPP.Models.Comment')
  - [Content](#P-SocialMediaAPP-Models-Comment-Content 'SocialMediaAPP.Models.Comment.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-Comment-CreatedAt 'SocialMediaAPP.Models.Comment.CreatedAt')
  - [Likes](#P-SocialMediaAPP-Models-Comment-Likes 'SocialMediaAPP.Models.Comment.Likes')
  - [Post](#P-SocialMediaAPP-Models-Comment-Post 'SocialMediaAPP.Models.Comment.Post')
  - [User](#P-SocialMediaAPP-Models-Comment-User 'SocialMediaAPP.Models.Comment.User')
- [CommentController](#T-SocialMediaAPP-Controllers-CommentController 'SocialMediaAPP.Controllers.CommentController')
  - [Delete(id)](#M-SocialMediaAPP-Controllers-CommentController-Delete-System-Int32- 'SocialMediaAPP.Controllers.CommentController.Delete(System.Int32)')
  - [GenerateComments(amount)](#M-SocialMediaAPP-Controllers-CommentController-GenerateComments-System-Int32- 'SocialMediaAPP.Controllers.CommentController.GenerateComments(System.Int32)')
  - [Get()](#M-SocialMediaAPP-Controllers-CommentController-Get 'SocialMediaAPP.Controllers.CommentController.Get')
  - [GetById(id)](#M-SocialMediaAPP-Controllers-CommentController-GetById-System-Int32- 'SocialMediaAPP.Controllers.CommentController.GetById(System.Int32)')
  - [Pagination(page,condition)](#M-SocialMediaAPP-Controllers-CommentController-Pagination-System-Int32,System-String- 'SocialMediaAPP.Controllers.CommentController.Pagination(System.Int32,System.String)')
  - [Post(dto)](#M-SocialMediaAPP-Controllers-CommentController-Post-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate- 'SocialMediaAPP.Controllers.CommentController.Post(SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate)')
  - [Put(id,dto)](#M-SocialMediaAPP-Controllers-CommentController-Put-System-Int32,SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate- 'SocialMediaAPP.Controllers.CommentController.Put(System.Int32,SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate)')
- [CommentDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate')
  - [#ctor(UserID,PostID,Content,Likes,CreatedAt)](#M-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-#ctor-System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime- 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.#ctor(System.Int32,System.Int32,System.String,System.Nullable{System.Int32},System.DateTime)')
  - [Content](#P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-Content 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-CreatedAt 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.CreatedAt')
  - [Likes](#P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-Likes 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.Likes')
  - [PostID](#P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-PostID 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.PostID')
  - [UserID](#P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-UserID 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate.UserID')
- [CommentDTORead](#T-SocialMediaAPP-Models-DTO-CommentDTORead 'SocialMediaAPP.Models.DTO.CommentDTORead')
  - [#ctor(ID,UserID,PostID,Content,Likes,CreatedAt)](#M-SocialMediaAPP-Models-DTO-CommentDTORead-#ctor-System-Int32,System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime,SocialMediaAPP-Models-DTO-UserDTORead- 'SocialMediaAPP.Models.DTO.CommentDTORead.#ctor(System.Int32,System.Int32,System.Int32,System.String,System.Nullable{System.Int32},System.DateTime,SocialMediaAPP.Models.DTO.UserDTORead)')
  - [Content](#P-SocialMediaAPP-Models-DTO-CommentDTORead-Content 'SocialMediaAPP.Models.DTO.CommentDTORead.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-CommentDTORead-CreatedAt 'SocialMediaAPP.Models.DTO.CommentDTORead.CreatedAt')
  - [ID](#P-SocialMediaAPP-Models-DTO-CommentDTORead-ID 'SocialMediaAPP.Models.DTO.CommentDTORead.ID')
  - [Likes](#P-SocialMediaAPP-Models-DTO-CommentDTORead-Likes 'SocialMediaAPP.Models.DTO.CommentDTORead.Likes')
  - [PostID](#P-SocialMediaAPP-Models-DTO-CommentDTORead-PostID 'SocialMediaAPP.Models.DTO.CommentDTORead.PostID')
  - [UserID](#P-SocialMediaAPP-Models-DTO-CommentDTORead-UserID 'SocialMediaAPP.Models.DTO.CommentDTORead.UserID')
- [CyclicController](#T-SocialMediaAPP-Controllers-CyclicController 'SocialMediaAPP.Controllers.CyclicController')
  - [ConvertToJson()](#M-SocialMediaAPP-Controllers-CyclicController-ConvertToJson-SocialMediaAPP-Controllers-CellData[0-,0-]- 'SocialMediaAPP.Controllers.CyclicController.ConvertToJson(SocialMediaAPP.Controllers.CellData[0:,0:])')
  - [CreateCyclic(rows,columns)](#M-SocialMediaAPP-Controllers-CyclicController-CreateCyclic-System-Int32,System-Int32- 'SocialMediaAPP.Controllers.CyclicController.CreateCyclic(System.Int32,System.Int32)')
  - [GetCyclic(rows,columns)](#M-SocialMediaAPP-Controllers-CyclicController-GetCyclic-System-String,System-String- 'SocialMediaAPP.Controllers.CyclicController.GetCyclic(System.String,System.String)')
- [Entity](#T-SocialMediaAPP-Models-Entity 'SocialMediaAPP.Models.Entity')
  - [ID](#P-SocialMediaAPP-Models-Entity-ID 'SocialMediaAPP.Models.Entity.ID')
- [Follower](#T-SocialMediaAPP-Models-Follower 'SocialMediaAPP.Models.Follower')
  - [FollowedAt](#P-SocialMediaAPP-Models-Follower-FollowedAt 'SocialMediaAPP.Models.Follower.FollowedAt')
  - [FollowerUser](#P-SocialMediaAPP-Models-Follower-FollowerUser 'SocialMediaAPP.Models.Follower.FollowerUser')
  - [User](#P-SocialMediaAPP-Models-Follower-User 'SocialMediaAPP.Models.Follower.User')
- [FollowerController](#T-SocialMediaAPP-Controllers-FollowerController 'SocialMediaAPP.Controllers.FollowerController')
  - [Delete(id)](#M-SocialMediaAPP-Controllers-FollowerController-Delete-System-Int32- 'SocialMediaAPP.Controllers.FollowerController.Delete(System.Int32)')
  - [GenerateFollowers(amount)](#M-SocialMediaAPP-Controllers-FollowerController-GenerateFollowers-System-Int32- 'SocialMediaAPP.Controllers.FollowerController.GenerateFollowers(System.Int32)')
  - [Get()](#M-SocialMediaAPP-Controllers-FollowerController-Get 'SocialMediaAPP.Controllers.FollowerController.Get')
  - [GetById(id)](#M-SocialMediaAPP-Controllers-FollowerController-GetById-System-Int32- 'SocialMediaAPP.Controllers.FollowerController.GetById(System.Int32)')
  - [GetFollowStatuses(currentUserId,followedUserIds)](#M-SocialMediaAPP-Controllers-FollowerController-GetFollowStatuses-System-Int32,System-String- 'SocialMediaAPP.Controllers.FollowerController.GetFollowStatuses(System.Int32,System.String)')
  - [Pagination(page,condition)](#M-SocialMediaAPP-Controllers-FollowerController-Pagination-System-Int32,System-String- 'SocialMediaAPP.Controllers.FollowerController.Pagination(System.Int32,System.String)')
  - [Post(dto)](#M-SocialMediaAPP-Controllers-FollowerController-Post-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate- 'SocialMediaAPP.Controllers.FollowerController.Post(SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate)')
  - [Put(id,dto)](#M-SocialMediaAPP-Controllers-FollowerController-Put-System-Int32,SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate- 'SocialMediaAPP.Controllers.FollowerController.Put(System.Int32,SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate)')
- [FollowerDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate')
  - [#ctor(UserID,FollowerUserID,FollowedAt)](#M-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-#ctor-System-Int32,System-Int32,System-DateTime- 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate.#ctor(System.Int32,System.Int32,System.DateTime)')
  - [FollowedAt](#P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-FollowedAt 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate.FollowedAt')
  - [FollowerUserID](#P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-FollowerUserID 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate.FollowerUserID')
  - [UserID](#P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-UserID 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate.UserID')
- [FollowerDTORead](#T-SocialMediaAPP-Models-DTO-FollowerDTORead 'SocialMediaAPP.Models.DTO.FollowerDTORead')
  - [#ctor(ID,User,FollowerUser,FollowedAt)](#M-SocialMediaAPP-Models-DTO-FollowerDTORead-#ctor-System-Int32,System-String,System-String,System-DateTime- 'SocialMediaAPP.Models.DTO.FollowerDTORead.#ctor(System.Int32,System.String,System.String,System.DateTime)')
  - [FollowedAt](#P-SocialMediaAPP-Models-DTO-FollowerDTORead-FollowedAt 'SocialMediaAPP.Models.DTO.FollowerDTORead.FollowedAt')
  - [FollowerUser](#P-SocialMediaAPP-Models-DTO-FollowerDTORead-FollowerUser 'SocialMediaAPP.Models.DTO.FollowerDTORead.FollowerUser')
  - [ID](#P-SocialMediaAPP-Models-DTO-FollowerDTORead-ID 'SocialMediaAPP.Models.DTO.FollowerDTORead.ID')
  - [User](#P-SocialMediaAPP-Models-DTO-FollowerDTORead-User 'SocialMediaAPP.Models.DTO.FollowerDTORead.User')
- [ImageDTO](#T-SocialMediaAPP-Models-DTO-ImageDTO 'SocialMediaAPP.Models.DTO.ImageDTO')
  - [#ctor(Base64)](#M-SocialMediaAPP-Models-DTO-ImageDTO-#ctor-System-String- 'SocialMediaAPP.Models.DTO.ImageDTO.#ctor(System.String)')
  - [Base64](#P-SocialMediaAPP-Models-DTO-ImageDTO-Base64 'SocialMediaAPP.Models.DTO.ImageDTO.Base64')
- [MainMappingProfile](#T-SocialMediaAPP-Mapping-MainMappingProfile 'SocialMediaAPP.Mapping.MainMappingProfile')
  - [#ctor()](#M-SocialMediaAPP-Mapping-MainMappingProfile-#ctor 'SocialMediaAPP.Mapping.MainMappingProfile.#ctor')
  - [FilePath(e)](#M-SocialMediaAPP-Mapping-MainMappingProfile-FilePath-SocialMediaAPP-Models-User- 'SocialMediaAPP.Mapping.MainMappingProfile.FilePath(SocialMediaAPP.Models.User)')
- [Operator](#T-SocialMediaAPP-Models-Operator 'SocialMediaAPP.Models.Operator')
  - [Email](#P-SocialMediaAPP-Models-Operator-Email 'SocialMediaAPP.Models.Operator.Email')
  - [Password](#P-SocialMediaAPP-Models-Operator-Password 'SocialMediaAPP.Models.Operator.Password')
  - [User](#P-SocialMediaAPP-Models-Operator-User 'SocialMediaAPP.Models.Operator.User')
  - [UserId](#P-SocialMediaAPP-Models-Operator-UserId 'SocialMediaAPP.Models.Operator.UserId')
- [OperatorDTO](#T-SocialMediaAPP-Models-DTO-OperatorDTO 'SocialMediaAPP.Models.DTO.OperatorDTO')
  - [#ctor(Email,Password)](#M-SocialMediaAPP-Models-DTO-OperatorDTO-#ctor-System-String,System-String- 'SocialMediaAPP.Models.DTO.OperatorDTO.#ctor(System.String,System.String)')
  - [Email](#P-SocialMediaAPP-Models-DTO-OperatorDTO-Email 'SocialMediaAPP.Models.DTO.OperatorDTO.Email')
  - [Password](#P-SocialMediaAPP-Models-DTO-OperatorDTO-Password 'SocialMediaAPP.Models.DTO.OperatorDTO.Password')
- [Post](#T-SocialMediaAPP-Models-Post 'SocialMediaAPP.Models.Post')
  - [Content](#P-SocialMediaAPP-Models-Post-Content 'SocialMediaAPP.Models.Post.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-Post-CreatedAt 'SocialMediaAPP.Models.Post.CreatedAt')
  - [Likes](#P-SocialMediaAPP-Models-Post-Likes 'SocialMediaAPP.Models.Post.Likes')
  - [User](#P-SocialMediaAPP-Models-Post-User 'SocialMediaAPP.Models.Post.User')
- [PostController](#T-SocialMediaAPP-Controllers-PostController 'SocialMediaAPP.Controllers.PostController')
  - [Delete(id)](#M-SocialMediaAPP-Controllers-PostController-Delete-System-Int32- 'SocialMediaAPP.Controllers.PostController.Delete(System.Int32)')
  - [Generate(amount)](#M-SocialMediaAPP-Controllers-PostController-Generate-System-Int32- 'SocialMediaAPP.Controllers.PostController.Generate(System.Int32)')
  - [Get()](#M-SocialMediaAPP-Controllers-PostController-Get 'SocialMediaAPP.Controllers.PostController.Get')
  - [GetById(id)](#M-SocialMediaAPP-Controllers-PostController-GetById-System-Int32- 'SocialMediaAPP.Controllers.PostController.GetById(System.Int32)')
  - [Pagination(page,condition)](#M-SocialMediaAPP-Controllers-PostController-Pagination-System-Int32,System-String- 'SocialMediaAPP.Controllers.PostController.Pagination(System.Int32,System.String)')
  - [Post(dto)](#M-SocialMediaAPP-Controllers-PostController-Post-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate- 'SocialMediaAPP.Controllers.PostController.Post(SocialMediaAPP.Models.DTO.PostDTOInsertUpdate)')
  - [Put(id,dto)](#M-SocialMediaAPP-Controllers-PostController-Put-System-Int32,SocialMediaAPP-Models-DTO-PostDTOInsertUpdate- 'SocialMediaAPP.Controllers.PostController.Put(System.Int32,SocialMediaAPP.Models.DTO.PostDTOInsertUpdate)')
- [PostDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate')
  - [#ctor(UserID,Content,Likes,CreatedAt)](#M-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-#ctor-System-Int32,System-String,System-Nullable{System-Int32},System-DateTime- 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate.#ctor(System.Int32,System.String,System.Nullable{System.Int32},System.DateTime)')
  - [Content](#P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-Content 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-CreatedAt 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate.CreatedAt')
  - [Likes](#P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-Likes 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate.Likes')
  - [UserID](#P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-UserID 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate.UserID')
- [PostDTORead](#T-SocialMediaAPP-Models-DTO-PostDTORead 'SocialMediaAPP.Models.DTO.PostDTORead')
  - [#ctor(ID,UserID,Content,Likes,CreatedAt)](#M-SocialMediaAPP-Models-DTO-PostDTORead-#ctor-System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime,System-Collections-Generic-List{SocialMediaAPP-Models-DTO-CommentDTORead},SocialMediaAPP-Models-DTO-UserDTORead- 'SocialMediaAPP.Models.DTO.PostDTORead.#ctor(System.Int32,System.Int32,System.String,System.Nullable{System.Int32},System.DateTime,System.Collections.Generic.List{SocialMediaAPP.Models.DTO.CommentDTORead},SocialMediaAPP.Models.DTO.UserDTORead)')
  - [Content](#P-SocialMediaAPP-Models-DTO-PostDTORead-Content 'SocialMediaAPP.Models.DTO.PostDTORead.Content')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-PostDTORead-CreatedAt 'SocialMediaAPP.Models.DTO.PostDTORead.CreatedAt')
  - [ID](#P-SocialMediaAPP-Models-DTO-PostDTORead-ID 'SocialMediaAPP.Models.DTO.PostDTORead.ID')
  - [Likes](#P-SocialMediaAPP-Models-DTO-PostDTORead-Likes 'SocialMediaAPP.Models.DTO.PostDTORead.Likes')
  - [UserID](#P-SocialMediaAPP-Models-DTO-PostDTORead-UserID 'SocialMediaAPP.Models.DTO.PostDTORead.UserID')
- [SocialMediaContext](#T-SocialMediaAPP-Data-SocialMediaContext 'SocialMediaAPP.Data.SocialMediaContext')
  - [#ctor(options)](#M-SocialMediaAPP-Data-SocialMediaContext-#ctor-Microsoft-EntityFrameworkCore-DbContextOptions{SocialMediaAPP-Data-SocialMediaContext}- 'SocialMediaAPP.Data.SocialMediaContext.#ctor(Microsoft.EntityFrameworkCore.DbContextOptions{SocialMediaAPP.Data.SocialMediaContext})')
  - [Comments](#P-SocialMediaAPP-Data-SocialMediaContext-Comments 'SocialMediaAPP.Data.SocialMediaContext.Comments')
  - [Followers](#P-SocialMediaAPP-Data-SocialMediaContext-Followers 'SocialMediaAPP.Data.SocialMediaContext.Followers')
  - [Operators](#P-SocialMediaAPP-Data-SocialMediaContext-Operators 'SocialMediaAPP.Data.SocialMediaContext.Operators')
  - [Posts](#P-SocialMediaAPP-Data-SocialMediaContext-Posts 'SocialMediaAPP.Data.SocialMediaContext.Posts')
  - [Users](#P-SocialMediaAPP-Data-SocialMediaContext-Users 'SocialMediaAPP.Data.SocialMediaContext.Users')
  - [OnModelCreating(modelBuilder)](#M-SocialMediaAPP-Data-SocialMediaContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder- 'SocialMediaAPP.Data.SocialMediaContext.OnModelCreating(Microsoft.EntityFrameworkCore.ModelBuilder)')
- [SocialMediaController](#T-SocialMediaAPP-Controllers-SocialMediaController 'SocialMediaAPP.Controllers.SocialMediaController')
  - [#ctor()](#M-SocialMediaAPP-Controllers-SocialMediaController-#ctor-SocialMediaAPP-Data-SocialMediaContext,AutoMapper-IMapper- 'SocialMediaAPP.Controllers.SocialMediaController.#ctor(SocialMediaAPP.Data.SocialMediaContext,AutoMapper.IMapper)')
  - [_context](#F-SocialMediaAPP-Controllers-SocialMediaController-_context 'SocialMediaAPP.Controllers.SocialMediaController._context')
  - [_mapper](#F-SocialMediaAPP-Controllers-SocialMediaController-_mapper 'SocialMediaAPP.Controllers.SocialMediaController._mapper')
- [SocialMediaExtensions](#T-SocialMediaAPP-Extensions-SocialMediaExtensions 'SocialMediaAPP.Extensions.SocialMediaExtensions')
  - [AddSocialMediaCORS(services)](#M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'SocialMediaAPP.Extensions.SocialMediaExtensions.AddSocialMediaCORS(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddSocialMediaSecurity(services)](#M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'SocialMediaAPP.Extensions.SocialMediaExtensions.AddSocialMediaSecurity(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
  - [AddSocialMediaSwaggerGen(services)](#M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection- 'SocialMediaAPP.Extensions.SocialMediaExtensions.AddSocialMediaSwaggerGen(Microsoft.Extensions.DependencyInjection.IServiceCollection)')
- [StatisticsController](#T-SocialMediaAPP-Controllers-StatisticsController 'SocialMediaAPP.Controllers.StatisticsController')
  - [Pagination(page,condition)](#M-SocialMediaAPP-Controllers-StatisticsController-Pagination-System-Int32,System-String- 'SocialMediaAPP.Controllers.StatisticsController.Pagination(System.Int32,System.String)')
  - [RandomUsers()](#M-SocialMediaAPP-Controllers-StatisticsController-RandomUsers 'SocialMediaAPP.Controllers.StatisticsController.RandomUsers')
  - [TopUserStats()](#M-SocialMediaAPP-Controllers-StatisticsController-TopUserStats 'SocialMediaAPP.Controllers.StatisticsController.TopUserStats')
  - [TotalData()](#M-SocialMediaAPP-Controllers-StatisticsController-TotalData 'SocialMediaAPP.Controllers.StatisticsController.TotalData')
- [User](#T-SocialMediaAPP-Models-User 'SocialMediaAPP.Models.User')
  - [BirthDate](#P-SocialMediaAPP-Models-User-BirthDate 'SocialMediaAPP.Models.User.BirthDate')
  - [CreatedAt](#P-SocialMediaAPP-Models-User-CreatedAt 'SocialMediaAPP.Models.User.CreatedAt')
  - [Email](#P-SocialMediaAPP-Models-User-Email 'SocialMediaAPP.Models.User.Email')
  - [FirstName](#P-SocialMediaAPP-Models-User-FirstName 'SocialMediaAPP.Models.User.FirstName')
  - [LastName](#P-SocialMediaAPP-Models-User-LastName 'SocialMediaAPP.Models.User.LastName')
  - [Password](#P-SocialMediaAPP-Models-User-Password 'SocialMediaAPP.Models.User.Password')
  - [Username](#P-SocialMediaAPP-Models-User-Username 'SocialMediaAPP.Models.User.Username')
- [UserController](#T-SocialMediaAPP-Controllers-UserController 'SocialMediaAPP.Controllers.UserController')
  - [Delete(id)](#M-SocialMediaAPP-Controllers-UserController-Delete-System-Int32- 'SocialMediaAPP.Controllers.UserController.Delete(System.Int32)')
  - [Generate(amount)](#M-SocialMediaAPP-Controllers-UserController-Generate-System-Int32- 'SocialMediaAPP.Controllers.UserController.Generate(System.Int32)')
  - [Get()](#M-SocialMediaAPP-Controllers-UserController-Get 'SocialMediaAPP.Controllers.UserController.Get')
  - [GetById(id)](#M-SocialMediaAPP-Controllers-UserController-GetById-System-Int32- 'SocialMediaAPP.Controllers.UserController.GetById(System.Int32)')
  - [Pagination(page,condition)](#M-SocialMediaAPP-Controllers-UserController-Pagination-System-Int32,System-String- 'SocialMediaAPP.Controllers.UserController.Pagination(System.Int32,System.String)')
  - [Post(dto)](#M-SocialMediaAPP-Controllers-UserController-Post-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate- 'SocialMediaAPP.Controllers.UserController.Post(SocialMediaAPP.Models.DTO.UserDTOInsertUpdate)')
  - [Put(id,dto)](#M-SocialMediaAPP-Controllers-UserController-Put-System-Int32,SocialMediaAPP-Models-DTO-UserDTOInsertUpdate- 'SocialMediaAPP.Controllers.UserController.Put(System.Int32,SocialMediaAPP.Models.DTO.UserDTOInsertUpdate)')
  - [SetImage(id,image)](#M-SocialMediaAPP-Controllers-UserController-SetImage-System-Int32,SocialMediaAPP-Models-DTO-ImageDTO- 'SocialMediaAPP.Controllers.UserController.SetImage(System.Int32,SocialMediaAPP.Models.DTO.ImageDTO)')
- [UserDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate')
  - [#ctor(Username,Password,Email,FirstName,LastName,BirthDate,CreatedAt)](#M-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-#ctor-System-String,System-String,System-String,System-String,System-String,System-DateTime,System-DateTime- 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.#ctor(System.String,System.String,System.String,System.String,System.String,System.DateTime,System.DateTime)')
  - [BirthDate](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-BirthDate 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.BirthDate')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-CreatedAt 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.CreatedAt')
  - [Email](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Email 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.Email')
  - [FirstName](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-FirstName 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.FirstName')
  - [LastName](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-LastName 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.LastName')
  - [Password](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Password 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.Password')
  - [Username](#P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Username 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate.Username')
- [UserDTORead](#T-SocialMediaAPP-Models-DTO-UserDTORead 'SocialMediaAPP.Models.DTO.UserDTORead')
  - [#ctor(ID,Username,Email,FirstName,LastName,BirthDate,CreatedAt,Image)](#M-SocialMediaAPP-Models-DTO-UserDTORead-#ctor-System-Int32,System-String,System-String,System-String,System-String,System-DateTime,System-DateTime,System-String- 'SocialMediaAPP.Models.DTO.UserDTORead.#ctor(System.Int32,System.String,System.String,System.String,System.String,System.DateTime,System.DateTime,System.String)')
  - [BirthDate](#P-SocialMediaAPP-Models-DTO-UserDTORead-BirthDate 'SocialMediaAPP.Models.DTO.UserDTORead.BirthDate')
  - [CreatedAt](#P-SocialMediaAPP-Models-DTO-UserDTORead-CreatedAt 'SocialMediaAPP.Models.DTO.UserDTORead.CreatedAt')
  - [Email](#P-SocialMediaAPP-Models-DTO-UserDTORead-Email 'SocialMediaAPP.Models.DTO.UserDTORead.Email')
  - [FirstName](#P-SocialMediaAPP-Models-DTO-UserDTORead-FirstName 'SocialMediaAPP.Models.DTO.UserDTORead.FirstName')
  - [ID](#P-SocialMediaAPP-Models-DTO-UserDTORead-ID 'SocialMediaAPP.Models.DTO.UserDTORead.ID')
  - [Image](#P-SocialMediaAPP-Models-DTO-UserDTORead-Image 'SocialMediaAPP.Models.DTO.UserDTORead.Image')
  - [LastName](#P-SocialMediaAPP-Models-DTO-UserDTORead-LastName 'SocialMediaAPP.Models.DTO.UserDTORead.LastName')
  - [Username](#P-SocialMediaAPP-Models-DTO-UserDTORead-Username 'SocialMediaAPP.Models.DTO.UserDTORead.Username')

<a name='T-SocialMediaAPP-Validations-AgeValidator'></a>
## AgeValidator `type`

##### Namespace

SocialMediaAPP.Validations

##### Summary

Custom validation attribute to ensure a user's age is at least a specified minimum.

<a name='M-SocialMediaAPP-Validations-AgeValidator-#ctor-System-Int32-'></a>
### #ctor(minimumAge) `constructor`

##### Summary

Initializes a new instance of the AgeValidator class with a specified minimum age.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| minimumAge | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The minimum age required for validation. |

<a name='M-SocialMediaAPP-Validations-AgeValidator-IsValid-System-Object,System-ComponentModel-DataAnnotations-ValidationContext-'></a>
### IsValid(value,validationContext) `method`

##### Summary

Validates the provided value to check if the user's age meets the minimum age requirement.

##### Returns

A ValidationResult indicating success or failure of the validation.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| value | [System.Object](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Object 'System.Object') | The value being validated, expected to be a DateTime representing the user's birth date. |
| validationContext | [System.ComponentModel.DataAnnotations.ValidationContext](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.ComponentModel.DataAnnotations.ValidationContext 'System.ComponentModel.DataAnnotations.ValidationContext') | The context within which the validation is executed. |

<a name='T-SocialMediaAPP-Controllers-AuthorizationController'></a>
## AuthorizationController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

Handles authorization and authentication for operators by validating credentials and generating JWT tokens.

<a name='M-SocialMediaAPP-Controllers-AuthorizationController-#ctor-SocialMediaAPP-Data-SocialMediaContext,AutoMapper-IMapper-'></a>
### #ctor(context,mapper) `constructor`

##### Summary

Initializes a new instance of the AuthorizationController class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| context | [SocialMediaAPP.Data.SocialMediaContext](#T-SocialMediaAPP-Data-SocialMediaContext 'SocialMediaAPP.Data.SocialMediaContext') | The database context used to interact with the application's data. |
| mapper | [AutoMapper.IMapper](#T-AutoMapper-IMapper 'AutoMapper.IMapper') | The AutoMapper instance used to map database models to DTOs. |

<a name='M-SocialMediaAPP-Controllers-AuthorizationController-GenerateToken-SocialMediaAPP-Models-DTO-OperatorDTO-'></a>
### GenerateToken(opt) `method`

##### Summary

Authenticates the operator and generates a JWT token.

##### Returns

A JWT token and the authenticated user's details.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| opt | [SocialMediaAPP.Models.DTO.OperatorDTO](#T-SocialMediaAPP-Models-DTO-OperatorDTO 'SocialMediaAPP.Models.DTO.OperatorDTO') | The operator's credentials (email and password). |

##### Remarks

### Example Request:

POST /api/v1/Authorization/token

```json
{
  "email": "demo@demo.com",
  "password": "demo"
}
```

### Example Response (200 OK):

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "username": "demo",
    "firstName": "Demo",
    "image": "/images/users/1.png"
  }
}
```

<a name='T-SocialMediaAPP-Controllers-CellData'></a>
## CellData `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

Represents the data structure of a cell in the cyclic matrix.
Each cell has a number, potential connections to its neighboring cells (up, down, left, right), 
and a background color.

<a name='P-SocialMediaAPP-Controllers-CellData-CellBgColor'></a>
### CellBgColor `property`

##### Summary

Gets or sets the background color of the cell.
The background color is represented as a hex code. Default is `#333`.

<a name='P-SocialMediaAPP-Controllers-CellData-CellDown'></a>
### CellDown `property`

##### Summary

Indicates whether the cell has a downward connection.

<a name='P-SocialMediaAPP-Controllers-CellData-CellLeft'></a>
### CellLeft `property`

##### Summary

Indicates whether the cell has a leftward connection.

<a name='P-SocialMediaAPP-Controllers-CellData-CellNumber'></a>
### CellNumber `property`

##### Summary

Gets or sets the number of the cell in the matrix.

<a name='P-SocialMediaAPP-Controllers-CellData-CellRight'></a>
### CellRight `property`

##### Summary

Indicates whether the cell has a rightward connection.

<a name='P-SocialMediaAPP-Controllers-CellData-CellUp'></a>
### CellUp `property`

##### Summary

Indicates whether the cell has an upward connection.

<a name='T-SocialMediaAPP-Models-Comment'></a>
## Comment `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Represents a comment made by a user on a post in the Social Media application.
Inherits from the base Entity class.

<a name='P-SocialMediaAPP-Models-Comment-Content'></a>
### Content `property`

##### Summary

The actual content of the comment.
Stored in the "comment" column in the database.

<a name='P-SocialMediaAPP-Models-Comment-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The date and time when the comment was created.

<a name='P-SocialMediaAPP-Models-Comment-Likes'></a>
### Likes `property`

##### Summary

The number of likes that the comment has received.

<a name='P-SocialMediaAPP-Models-Comment-Post'></a>
### Post `property`

##### Summary

The post to which the comment is related. 
This is a required relationship, represented by a foreign key to the Post entity.

<a name='P-SocialMediaAPP-Models-Comment-User'></a>
### User `property`

##### Summary

The user who created the comment. 
This is a required relationship, represented by a foreign key to the User entity.

<a name='T-SocialMediaAPP-Controllers-CommentController'></a>
## CommentController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller for handling comment-related operations.
Provides endpoints for creating, retrieving, updating, and deleting comments within the social media platform.

<a name='M-SocialMediaAPP-Controllers-CommentController-Delete-System-Int32-'></a>
### Delete(id) `method`

##### Summary

Deletes a comment by its ID.

##### Returns

HTTP 200 OK status if the deletion is successful.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the comment to delete. |

<a name='M-SocialMediaAPP-Controllers-CommentController-GenerateComments-System-Int32-'></a>
### GenerateComments(amount) `method`

##### Summary

Generates a specified number of random comments and associates them with random users and posts from the database.
The comments are assigned randomized content, likes, and timestamps within the past 120 days.

##### Returns

A list of generated comments with their details or an error message if the amount is out of range.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of comments to generate. Must be between 1 and 500. |

<a name='M-SocialMediaAPP-Controllers-CommentController-Get'></a>
### Get() `method`

##### Summary

Retrieves all comments along with associated user and post details.

##### Returns

A list of CommentDTORead objects containing comment details.

##### Parameters

This method has no parameters.

<a name='M-SocialMediaAPP-Controllers-CommentController-GetById-System-Int32-'></a>
### GetById(id) `method`

##### Summary

Retrieves a specific comment by its ID, including associated user and post details.

##### Returns

The CommentDTOInsertUpdate object with the comment details if found.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the comment to retrieve. |

<a name='M-SocialMediaAPP-Controllers-CommentController-Pagination-System-Int32,System-String-'></a>
### Pagination(page,condition) `method`

##### Summary

Retrieves a paginated list of comments with optional filtering based on content, username, or user details.

##### Returns

A paginated list of CommentDTORead objects with HTTP 200 OK status.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number to retrieve. |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Optional condition for filtering (e.g., comment content or user information). |

<a name='M-SocialMediaAPP-Controllers-CommentController-Post-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-'></a>
### Post(dto) `method`

##### Summary

Adds a new comment to the system.

##### Returns

HTTP 201 Created status with the created comment details if successful.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dto | [SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate') | The CommentDTOInsertUpdate object containing the comment's data. |

<a name='M-SocialMediaAPP-Controllers-CommentController-Put-System-Int32,SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-'></a>
### Put(id,dto) `method`

##### Summary

Updates an existing comment by its ID.

##### Returns

HTTP 200 OK status if the update is successful.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the comment to update. |
| dto | [SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate 'SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate') | The CommentDTOInsertUpdate object containing the updated comment data. |

<a name='T-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate'></a>
## CommentDTOInsertUpdate `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for inserting or updating a comment.
Contains required fields for creating or modifying a comment, such as user and post associations, 
comment content, and the date it was created. Optional fields like likes are also included.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [T:SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate](#T-T-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate 'T:SocialMediaAPP.Models.DTO.CommentDTOInsertUpdate') | The unique identifier of the user making the comment. This field is required. |

<a name='M-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-#ctor-System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime-'></a>
### #ctor(UserID,PostID,Content,Likes,CreatedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for inserting or updating a comment.
Contains required fields for creating or modifying a comment, such as user and post associations, 
comment content, and the date it was created. Optional fields like likes are also included.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user making the comment. This field is required. |
| PostID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the post the comment is related to. This field is required. |
| Content | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The textual content of the comment. This field is required. |
| Likes | [System.Nullable{System.Int32}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Nullable 'System.Nullable{System.Int32}') | The number of likes the comment has received. This field is optional and can be null. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the comment was created. This field is required and should be provided in UTC. |

<a name='P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-Content'></a>
### Content `property`

##### Summary

The textual content of the comment. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the comment was created. This field is required and should be provided in UTC.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-Likes'></a>
### Likes `property`

##### Summary

The number of likes the comment has received. This field is optional and can be null.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-PostID'></a>
### PostID `property`

##### Summary

The unique identifier of the post the comment is related to. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTOInsertUpdate-UserID'></a>
### UserID `property`

##### Summary

The unique identifier of the user making the comment. This field is required.

<a name='T-SocialMediaAPP-Models-DTO-CommentDTORead'></a>
## CommentDTORead `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for reading a comment.
Represents the structure of a comment as it is returned from the API.
Includes details such as the comment ID, the user who made the comment, the post it's associated with, 
the content of the comment, the number of likes, and the date it was created.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [T:SocialMediaAPP.Models.DTO.CommentDTORead](#T-T-SocialMediaAPP-Models-DTO-CommentDTORead 'T:SocialMediaAPP.Models.DTO.CommentDTORead') | The unique identifier of the comment. |

<a name='M-SocialMediaAPP-Models-DTO-CommentDTORead-#ctor-System-Int32,System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime,SocialMediaAPP-Models-DTO-UserDTORead-'></a>
### #ctor(ID,UserID,PostID,Content,Likes,CreatedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for reading a comment.
Represents the structure of a comment as it is returned from the API.
Includes details such as the comment ID, the user who made the comment, the post it's associated with, 
the content of the comment, the number of likes, and the date it was created.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the comment. |
| UserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user who made the comment. |
| PostID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the post the comment is associated with. |
| Content | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The textual content of the comment. |
| Likes | [System.Nullable{System.Int32}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Nullable 'System.Nullable{System.Int32}') | The number of likes the comment has received. Can be null if the comment has no likes yet. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the comment was created. Stored as UTC. |

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-Content'></a>
### Content `property`

##### Summary

The textual content of the comment.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the comment was created. Stored as UTC.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-ID'></a>
### ID `property`

##### Summary

The unique identifier of the comment.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-Likes'></a>
### Likes `property`

##### Summary

The number of likes the comment has received. Can be null if the comment has no likes yet.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-PostID'></a>
### PostID `property`

##### Summary

The unique identifier of the post the comment is associated with.

<a name='P-SocialMediaAPP-Models-DTO-CommentDTORead-UserID'></a>
### UserID `property`

##### Summary

The unique identifier of the user who made the comment.

<a name='T-SocialMediaAPP-Controllers-CyclicController'></a>
## CyclicController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller for creating and returning a cyclic matrix based on the provided rows and columns.
A cyclic matrix follows a specific cyclic pattern where cells are connected to neighboring cells.

<a name='M-SocialMediaAPP-Controllers-CyclicController-ConvertToJson-SocialMediaAPP-Controllers-CellData[0-,0-]-'></a>
### ConvertToJson() `method`

##### Summary

Converts the two-dimensional matrix into a JSON-friendly list of lists.

##### Returns

A list of lists of [CellData](#T-SocialMediaAPP-Controllers-CellData 'SocialMediaAPP.Controllers.CellData'), where each list represents a row in the matrix.

##### Parameters

This method has no parameters.

<a name='M-SocialMediaAPP-Controllers-CyclicController-CreateCyclic-System-Int32,System-Int32-'></a>
### CreateCyclic(rows,columns) `method`

##### Summary

Creates a cyclic matrix with the specified number of rows and columns.
Each cell is assigned a unique number and directional connections to its neighbors.

##### Returns

A two-dimensional array of CellData representing the cyclic matrix.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rows | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of rows in the matrix. |
| columns | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of columns in the matrix. |

<a name='M-SocialMediaAPP-Controllers-CyclicController-GetCyclic-System-String,System-String-'></a>
### GetCyclic(rows,columns) `method`

##### Summary

Generates a cyclic matrix based on the specified number of rows and columns.

##### Returns

A JSON object containing the generated cyclic matrix or an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| rows | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The number of rows in the matrix (between 1 and 10). |
| columns | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The number of columns in the matrix (between 1 and 10). |

<a name='T-SocialMediaAPP-Models-Entity'></a>
## Entity `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Abstract base class representing a common entity with an optional ID.
This class serves as a base for other entities in the Social Media application.

<a name='P-SocialMediaAPP-Models-Entity-ID'></a>
### ID `property`

##### Summary

The unique identifier (ID) for the entity.
It is an optional field, allowing for nullable IDs in cases like newly created objects before they are persisted in the database.

<a name='T-SocialMediaAPP-Models-Follower'></a>
## Follower `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Represents a follower relationship between two users in the Social Media application.
Inherits from the base Entity class.

<a name='P-SocialMediaAPP-Models-Follower-FollowedAt'></a>
### FollowedAt `property`

##### Summary

The date and time when the follow relationship was created.

<a name='P-SocialMediaAPP-Models-Follower-FollowerUser'></a>
### FollowerUser `property`

##### Summary

The user who is following. 
This is a required relationship, represented by a foreign key to the User entity.

<a name='P-SocialMediaAPP-Models-Follower-User'></a>
### User `property`

##### Summary

The user who is being followed. 
This is a required relationship, represented by a foreign key to the User entity.

<a name='T-SocialMediaAPP-Controllers-FollowerController'></a>
## FollowerController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller to manage follower relationships between users.
This controller handles operations for creating, retrieving, updating, and deleting followers.

<a name='M-SocialMediaAPP-Controllers-FollowerController-Delete-System-Int32-'></a>
### Delete(id) `method`

##### Summary

Deletes a follower relationship by its ID.

##### Returns

HTTP 200 OK if the deletion is successful, or an error message if the follower relationship is not found.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the follower relationship to delete. |

<a name='M-SocialMediaAPP-Controllers-FollowerController-GenerateFollowers-System-Int32-'></a>
### GenerateFollowers(amount) `method`

##### Summary

Generates a specified number of random follower relationships between users.

##### Returns

A success message and a list of the generated follower relationships, or a \`400 Bad Request\` if the amount is invalid.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of follower relationships to generate (between 1 and 500). |

<a name='M-SocialMediaAPP-Controllers-FollowerController-Get'></a>
### Get() `method`

##### Summary

Retrieves all follower relationships, including users and their followers.

##### Returns

A list of follower relationships with HTTP 200 OK status, or an error message with HTTP 400 status.

##### Parameters

This method has no parameters.

<a name='M-SocialMediaAPP-Controllers-FollowerController-GetById-System-Int32-'></a>
### GetById(id) `method`

##### Summary

Retrieves a specific follower relationship by its ID.

##### Returns

The follower relationship if found, or an error message if not found.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the follower relationship. |

<a name='M-SocialMediaAPP-Controllers-FollowerController-GetFollowStatuses-System-Int32,System-String-'></a>
### GetFollowStatuses(currentUserId,followedUserIds) `method`

##### Summary

Retrieves the follow statuses of a list of users for the specified current user.

##### Returns

An IActionResult containing a dictionary where each key is a user ID from the provided list,
and the value is an object indicating if the current user is following that user and the follower's ID if applicable.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| currentUserId | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the current user for whom the follow statuses are being checked. |
| followedUserIds | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | A comma-separated string of user IDs representing the users the current user may follow. |

##### Remarks

This endpoint expects a valid comma-separated string of followed user IDs in the query parameter.
If the string is empty or improperly formatted, the API will respond with a BadRequest (400).
The method checks which users from the provided list the current user follows, and returns
a dictionary where each entry contains a boolean \`isFollowing\` flag and the follower's ID.

<a name='M-SocialMediaAPP-Controllers-FollowerController-Pagination-System-Int32,System-String-'></a>
### Pagination(page,condition) `method`

##### Summary

Retrieves paginated follower relationships, filtered by condition (e.g., username).

##### Returns

A paginated list of follower relationships or an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number to retrieve. |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Optional filter condition for the search (e.g., username). |

<a name='M-SocialMediaAPP-Controllers-FollowerController-Post-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-'></a>
### Post(dto) `method`

##### Summary

Creates a new follower relationship between users.

##### Returns

HTTP 201 Created if successful, or an error message if validation or creation fails.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dto | [SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate') | The DTO containing follower relationship data. |

<a name='M-SocialMediaAPP-Controllers-FollowerController-Put-System-Int32,SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-'></a>
### Put(id,dto) `method`

##### Summary

Updates an existing follower relationship.

##### Returns

HTTP 200 OK if the update is successful, otherwise an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the follower relationship to update. |
| dto | [SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate 'SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate') | The updated follower data. |

<a name='T-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate'></a>
## FollowerDTOInsertUpdate `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for inserting or updating a follower relationship.
Represents the relationship between a user and their follower, including the date the follow action occurred.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [T:SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate](#T-T-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate 'T:SocialMediaAPP.Models.DTO.FollowerDTOInsertUpdate') | The unique identifier of the user being followed. This field is required. |

<a name='M-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-#ctor-System-Int32,System-Int32,System-DateTime-'></a>
### #ctor(UserID,FollowerUserID,FollowedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for inserting or updating a follower relationship.
Represents the relationship between a user and their follower, including the date the follow action occurred.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user being followed. This field is required. |
| FollowerUserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user who is following. This field is required. |
| FollowedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the follow action occurred. This field is required and should be in UTC. |

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-FollowedAt'></a>
### FollowedAt `property`

##### Summary

The timestamp indicating when the follow action occurred. This field is required and should be in UTC.

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-FollowerUserID'></a>
### FollowerUserID `property`

##### Summary

The unique identifier of the user who is following. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTOInsertUpdate-UserID'></a>
### UserID `property`

##### Summary

The unique identifier of the user being followed. This field is required.

<a name='T-SocialMediaAPP-Models-DTO-FollowerDTORead'></a>
## FollowerDTORead `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for reading a follower relationship.
Represents the structure of a follower relationship as it is returned from the API, 
including details about the users involved and the date the follow action occurred.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [T:SocialMediaAPP.Models.DTO.FollowerDTORead](#T-T-SocialMediaAPP-Models-DTO-FollowerDTORead 'T:SocialMediaAPP.Models.DTO.FollowerDTORead') | The unique identifier of the follower relationship. |

<a name='M-SocialMediaAPP-Models-DTO-FollowerDTORead-#ctor-System-Int32,System-String,System-String,System-DateTime-'></a>
### #ctor(ID,User,FollowerUser,FollowedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for reading a follower relationship.
Represents the structure of a follower relationship as it is returned from the API, 
including details about the users involved and the date the follow action occurred.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the follower relationship. |
| User | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The username of the user being followed. |
| FollowerUser | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The username of the user who is following. |
| FollowedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the follow action occurred. |

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTORead-FollowedAt'></a>
### FollowedAt `property`

##### Summary

The timestamp indicating when the follow action occurred.

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTORead-FollowerUser'></a>
### FollowerUser `property`

##### Summary

The username of the user who is following.

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTORead-ID'></a>
### ID `property`

##### Summary

The unique identifier of the follower relationship.

<a name='P-SocialMediaAPP-Models-DTO-FollowerDTORead-User'></a>
### User `property`

##### Summary

The username of the user being followed.

<a name='T-SocialMediaAPP-Models-DTO-ImageDTO'></a>
## ImageDTO `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for uploading or updating an image.
Represents the structure of an image as a Base64 encoded string, typically used for transferring images
as part of API requests.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Base64 | [T:SocialMediaAPP.Models.DTO.ImageDTO](#T-T-SocialMediaAPP-Models-DTO-ImageDTO 'T:SocialMediaAPP.Models.DTO.ImageDTO') | The Base64 encoded string representing the image. This field is required. |

<a name='M-SocialMediaAPP-Models-DTO-ImageDTO-#ctor-System-String-'></a>
### #ctor(Base64) `constructor`

##### Summary

Data Transfer Object (DTO) for uploading or updating an image.
Represents the structure of an image as a Base64 encoded string, typically used for transferring images
as part of API requests.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Base64 | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The Base64 encoded string representing the image. This field is required. |

<a name='P-SocialMediaAPP-Models-DTO-ImageDTO-Base64'></a>
### Base64 `property`

##### Summary

The Base64 encoded string representing the image. This field is required.

<a name='T-SocialMediaAPP-Mapping-MainMappingProfile'></a>
## MainMappingProfile `type`

##### Namespace

SocialMediaAPP.Mapping

##### Summary

Defines the AutoMapper profile for mapping between domain models and DTOs used in the application.

<a name='M-SocialMediaAPP-Mapping-MainMappingProfile-#ctor'></a>
### #ctor() `constructor`

##### Summary

Initializes a new instance of the MainMappingProfile class.
Sets up mappings between entities and their corresponding DTOs.

##### Parameters

This constructor has no parameters.

<a name='M-SocialMediaAPP-Mapping-MainMappingProfile-FilePath-SocialMediaAPP-Models-User-'></a>
### FilePath(e) `method`

##### Summary

Returns the file path of the user's profile image if it exists.

##### Returns

The file path of the user's image, or null if the image does not exist.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| e | [SocialMediaAPP.Models.User](#T-SocialMediaAPP-Models-User 'SocialMediaAPP.Models.User') | The User object. |

<a name='T-SocialMediaAPP-Models-Operator'></a>
## Operator `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Represents an operator in the Social Media application, responsible for administrative or system-level tasks.
Inherits from the base Entity class.

<a name='P-SocialMediaAPP-Models-Operator-Email'></a>
### Email `property`

##### Summary

The email address of the operator.
This is optional and may be used for authentication or contact purposes.

<a name='P-SocialMediaAPP-Models-Operator-Password'></a>
### Password `property`

##### Summary

The password for the operator, used for authentication.
This is optional and can be null if authentication is handled differently.

<a name='P-SocialMediaAPP-Models-Operator-User'></a>
### User `property`

##### Summary

The associated User entity, representing the operator's corresponding user information.
This is optional and may be null.

<a name='P-SocialMediaAPP-Models-Operator-UserId'></a>
### UserId `property`

##### Summary

The ID of the associated user, linked to the User entity.

<a name='T-SocialMediaAPP-Models-DTO-OperatorDTO'></a>
## OperatorDTO `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for handling operator authentication.
Contains the necessary fields for an operator to log in to the system, including their email and password.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Email | [T:SocialMediaAPP.Models.DTO.OperatorDTO](#T-T-SocialMediaAPP-Models-DTO-OperatorDTO 'T:SocialMediaAPP.Models.DTO.OperatorDTO') | The email address of the operator. This field is required for authentication. |

<a name='M-SocialMediaAPP-Models-DTO-OperatorDTO-#ctor-System-String,System-String-'></a>
### #ctor(Email,Password) `constructor`

##### Summary

Data Transfer Object (DTO) for handling operator authentication.
Contains the necessary fields for an operator to log in to the system, including their email and password.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Email | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The email address of the operator. This field is required for authentication. |
| Password | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The password of the operator. This field is required for authentication. |

<a name='P-SocialMediaAPP-Models-DTO-OperatorDTO-Email'></a>
### Email `property`

##### Summary

The email address of the operator. This field is required for authentication.

<a name='P-SocialMediaAPP-Models-DTO-OperatorDTO-Password'></a>
### Password `property`

##### Summary

The password of the operator. This field is required for authentication.

<a name='T-SocialMediaAPP-Models-Post'></a>
## Post `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Represents a post created by a user in the Social Media application.
Inherits from the base Entity class.

<a name='P-SocialMediaAPP-Models-Post-Content'></a>
### Content `property`

##### Summary

The content of the post.
Stored in the "post" column in the database.

<a name='P-SocialMediaAPP-Models-Post-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The date and time when the post was created.

<a name='P-SocialMediaAPP-Models-Post-Likes'></a>
### Likes `property`

##### Summary

The number of likes that the post has received.

<a name='P-SocialMediaAPP-Models-Post-User'></a>
### User `property`

##### Summary

The user who created the post.
This is a required relationship, represented by a foreign key to the User entity.

<a name='T-SocialMediaAPP-Controllers-PostController'></a>
## PostController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller to manage user posts in the social media platform.
Provides CRUD operations and pagination functionalities for posts.

<a name='M-SocialMediaAPP-Controllers-PostController-Delete-System-Int32-'></a>
### Delete(id) `method`

##### Summary

Deletes a post by its ID.

##### Returns

HTTP 200 OK if the deletion is successful, otherwise an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the post to delete. |

<a name='M-SocialMediaAPP-Controllers-PostController-Generate-System-Int32-'></a>
### Generate(amount) `method`

##### Summary

Generates a specified number of random posts and associates them with random users in the database.
Each post will have randomized content, likes, and a created date within the past 120 days.

##### Returns

A list of generated posts with their details or an error message if the amount is invalid.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of posts to generate. Must be between 1 and 500. |

<a name='M-SocialMediaAPP-Controllers-PostController-Get'></a>
### Get() `method`

##### Summary

Retrieves all posts with associated user information.

##### Returns

A list of PostDTORead objects with HTTP 200 OK status, or an error message.

##### Parameters

This method has no parameters.

<a name='M-SocialMediaAPP-Controllers-PostController-GetById-System-Int32-'></a>
### GetById(id) `method`

##### Summary

Retrieves a specific post by its ID.

##### Returns

A PostDTORead object with the post details if found, 
or an error message if the post is not found.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the post to retrieve. |

<a name='M-SocialMediaAPP-Controllers-PostController-Pagination-System-Int32,System-String-'></a>
### Pagination(page,condition) `method`

##### Summary

Retrieves paginated posts based on the specified page number and optional filtering condition.

##### Returns

A paginated list of PostDTORead objects with HTTP 200 OK status, or an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number to retrieve. |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Optional filter condition (e.g., content, username). |

<a name='M-SocialMediaAPP-Controllers-PostController-Post-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-'></a>
### Post(dto) `method`

##### Summary

Creates a new post and associates it with a user.

##### Returns

HTTP 201 Created with the created post details if successful, otherwise an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dto | [SocialMediaAPP.Models.DTO.PostDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate') | The PostDTOInsertUpdate object containing the post data. |

<a name='M-SocialMediaAPP-Controllers-PostController-Put-System-Int32,SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-'></a>
### Put(id,dto) `method`

##### Summary

Updates an existing post by its ID.

##### Returns

HTTP 200 OK if the update is successful, otherwise an error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The ID of the post to update. |
| dto | [SocialMediaAPP.Models.DTO.PostDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate 'SocialMediaAPP.Models.DTO.PostDTOInsertUpdate') | The PostDTOInsertUpdate object containing the updated post data. |

<a name='T-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate'></a>
## PostDTOInsertUpdate `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for inserting or updating a post.
Contains the necessary fields for creating or updating a post in the social media platform, including the user who made the post, its content, and the creation date.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [T:SocialMediaAPP.Models.DTO.PostDTOInsertUpdate](#T-T-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate 'T:SocialMediaAPP.Models.DTO.PostDTOInsertUpdate') | The unique identifier of the user who is creating or updating the post. This field is required. |

<a name='M-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-#ctor-System-Int32,System-String,System-Nullable{System-Int32},System-DateTime-'></a>
### #ctor(UserID,Content,Likes,CreatedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for inserting or updating a post.
Contains the necessary fields for creating or updating a post in the social media platform, including the user who made the post, its content, and the creation date.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| UserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user who is creating or updating the post. This field is required. |
| Content | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The content of the post. This field is required. |
| Likes | [System.Nullable{System.Int32}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Nullable 'System.Nullable{System.Int32}') | The number of likes the post has received. This field is optional and can be null if no likes are recorded. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the post was created. This field is required. |

<a name='P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-Content'></a>
### Content `property`

##### Summary

The content of the post. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the post was created. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-Likes'></a>
### Likes `property`

##### Summary

The number of likes the post has received. This field is optional and can be null if no likes are recorded.

<a name='P-SocialMediaAPP-Models-DTO-PostDTOInsertUpdate-UserID'></a>
### UserID `property`

##### Summary

The unique identifier of the user who is creating or updating the post. This field is required.

<a name='T-SocialMediaAPP-Models-DTO-PostDTORead'></a>
## PostDTORead `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for reading a post.
Represents the structure of a post as it is returned from the API, including details such as the post ID, 
the user who created it, its content, the number of likes, and the date it was created.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [T:SocialMediaAPP.Models.DTO.PostDTORead](#T-T-SocialMediaAPP-Models-DTO-PostDTORead 'T:SocialMediaAPP.Models.DTO.PostDTORead') | The unique identifier of the post. |

<a name='M-SocialMediaAPP-Models-DTO-PostDTORead-#ctor-System-Int32,System-Int32,System-String,System-Nullable{System-Int32},System-DateTime,System-Collections-Generic-List{SocialMediaAPP-Models-DTO-CommentDTORead},SocialMediaAPP-Models-DTO-UserDTORead-'></a>
### #ctor(ID,UserID,Content,Likes,CreatedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for reading a post.
Represents the structure of a post as it is returned from the API, including details such as the post ID, 
the user who created it, its content, the number of likes, and the date it was created.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the post. |
| UserID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user who created the post. |
| Content | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The content of the post. |
| Likes | [System.Nullable{System.Int32}](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Nullable 'System.Nullable{System.Int32}') | The number of likes the post has received. This field is optional and can be null if no likes are recorded. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the post was created. |

<a name='P-SocialMediaAPP-Models-DTO-PostDTORead-Content'></a>
### Content `property`

##### Summary

The content of the post.

<a name='P-SocialMediaAPP-Models-DTO-PostDTORead-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the post was created.

<a name='P-SocialMediaAPP-Models-DTO-PostDTORead-ID'></a>
### ID `property`

##### Summary

The unique identifier of the post.

<a name='P-SocialMediaAPP-Models-DTO-PostDTORead-Likes'></a>
### Likes `property`

##### Summary

The number of likes the post has received. This field is optional and can be null if no likes are recorded.

<a name='P-SocialMediaAPP-Models-DTO-PostDTORead-UserID'></a>
### UserID `property`

##### Summary

The unique identifier of the user who created the post.

<a name='T-SocialMediaAPP-Data-SocialMediaContext'></a>
## SocialMediaContext `type`

##### Namespace

SocialMediaAPP.Data

##### Summary

Database context for the SocialMediaApp, responsible for managing entities and database interactions.
Inherits from the DbContext class.

<a name='M-SocialMediaAPP-Data-SocialMediaContext-#ctor-Microsoft-EntityFrameworkCore-DbContextOptions{SocialMediaAPP-Data-SocialMediaContext}-'></a>
### #ctor(options) `constructor`

##### Summary

Initializes a new instance of the SocialMediaContext class.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| options | [Microsoft.EntityFrameworkCore.DbContextOptions{SocialMediaAPP.Data.SocialMediaContext}](#T-Microsoft-EntityFrameworkCore-DbContextOptions{SocialMediaAPP-Data-SocialMediaContext} 'Microsoft.EntityFrameworkCore.DbContextOptions{SocialMediaAPP.Data.SocialMediaContext}') | The options to configure the database context. |

<a name='P-SocialMediaAPP-Data-SocialMediaContext-Comments'></a>
### Comments `property`

##### Summary

Gets or sets the Comments table, representing comments on posts.

<a name='P-SocialMediaAPP-Data-SocialMediaContext-Followers'></a>
### Followers `property`

##### Summary

Gets or sets the Followers table, representing the relationship between users and their followers.

<a name='P-SocialMediaAPP-Data-SocialMediaContext-Operators'></a>
### Operators `property`

##### Summary

Gets or sets the Operators table, representing system operators.

<a name='P-SocialMediaAPP-Data-SocialMediaContext-Posts'></a>
### Posts `property`

##### Summary

Gets or sets the Posts table.

<a name='P-SocialMediaAPP-Data-SocialMediaContext-Users'></a>
### Users `property`

##### Summary

Gets or sets the Users table.

<a name='M-SocialMediaAPP-Data-SocialMediaContext-OnModelCreating-Microsoft-EntityFrameworkCore-ModelBuilder-'></a>
### OnModelCreating(modelBuilder) `method`

##### Summary

Configures the entity relationships and constraints in the database using the model builder.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| modelBuilder | [Microsoft.EntityFrameworkCore.ModelBuilder](#T-Microsoft-EntityFrameworkCore-ModelBuilder 'Microsoft.EntityFrameworkCore.ModelBuilder') | The model builder used to configure entities. |

<a name='T-SocialMediaAPP-Controllers-SocialMediaController'></a>
## SocialMediaController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

Abstract base controller for all controllers in the SocialMediaApp.
Provides shared functionality and services such as database context and object mapping.
Requires authorization for all derived controllers.

<a name='M-SocialMediaAPP-Controllers-SocialMediaController-#ctor-SocialMediaAPP-Data-SocialMediaContext,AutoMapper-IMapper-'></a>
### #ctor() `constructor`

##### Summary

Abstract base controller for all controllers in the SocialMediaApp.
Provides shared functionality and services such as database context and object mapping.
Requires authorization for all derived controllers.

##### Parameters

This constructor has no parameters.

<a name='F-SocialMediaAPP-Controllers-SocialMediaController-_context'></a>
### _context `constants`

##### Summary

Database context for accessing social media data.

<a name='F-SocialMediaAPP-Controllers-SocialMediaController-_mapper'></a>
### _mapper `constants`

##### Summary

Mapper service for converting between models and DTOs.

<a name='T-SocialMediaAPP-Extensions-SocialMediaExtensions'></a>
## SocialMediaExtensions `type`

##### Namespace

SocialMediaAPP.Extensions

##### Summary

Provides extension methods for configuring Swagger, CORS, and security (JWT authentication) for the Social Media API.

<a name='M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaCORS-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddSocialMediaCORS(services) `method`

##### Summary

Adds and configures Cross-Origin Resource Sharing (CORS) policies for the Social Media API.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The IServiceCollection to add CORS policies to. |

<a name='M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaSecurity-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddSocialMediaSecurity(services) `method`

##### Summary

Adds and configures JWT authentication for the Social Media API.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The IServiceCollection to add JWT security to. |

<a name='M-SocialMediaAPP-Extensions-SocialMediaExtensions-AddSocialMediaSwaggerGen-Microsoft-Extensions-DependencyInjection-IServiceCollection-'></a>
### AddSocialMediaSwaggerGen(services) `method`

##### Summary

Adds and configures Swagger/OpenAPI documentation for the Social Media API.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| services | [Microsoft.Extensions.DependencyInjection.IServiceCollection](#T-Microsoft-Extensions-DependencyInjection-IServiceCollection 'Microsoft.Extensions.DependencyInjection.IServiceCollection') | The IServiceCollection to add SwaggerGen to. |

<a name='T-SocialMediaAPP-Controllers-StatisticsController'></a>
## StatisticsController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller responsible for handling home-related operations for the social media application.

<a name='M-SocialMediaAPP-Controllers-StatisticsController-Pagination-System-Int32,System-String-'></a>
### Pagination(page,condition) `method`

##### Summary

Retrieves a paginated list of posts, with optional filtering based on a search term.

##### Returns

A paginated list of posts that match the search condition. If no posts match, an empty list is returned. 
In the case of an error, a \`400 Bad Request\` is returned with the error message.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number to retrieve, starting from 1. Each page contains a fixed number of posts. |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | An optional search term used to filter posts. The search will match the post content, username, first name, or last name.
If no condition is provided, all posts are retrieved. |

<a name='M-SocialMediaAPP-Controllers-StatisticsController-RandomUsers'></a>
### RandomUsers() `method`

##### Summary

Retrieves a random list of up to 50 users.

##### Parameters

This method has no parameters.

##### Remarks

This endpoint returns a random set of users shuffled and limited to 50 users.

<a name='M-SocialMediaAPP-Controllers-StatisticsController-TopUserStats'></a>
### TopUserStats() `method`

##### Summary

Retrieves various platform statistics, including top users by posts and comments, most liked posts and comments,
most followed user, and recent user registrations over the last 30 days.

##### Parameters

This method has no parameters.

##### Remarks

This API returns the following data:
- Top 10 users by number of posts.
- Top 10 users by number of comments.
- The post with the most likes.
- The comment with the most likes.
- The user with the most followers.
- A count of registered users grouped by date for the last 30 days.

<a name='M-SocialMediaAPP-Controllers-StatisticsController-TotalData'></a>
### TotalData() `method`

##### Summary

Retrieves total counts of users, posts, and comments.

##### Parameters

This method has no parameters.

<a name='T-SocialMediaAPP-Models-User'></a>
## User `type`

##### Namespace

SocialMediaAPP.Models

##### Summary

Represents a user in the Social Media application.
Inherits from the base Entity class, providing a unique identifier for each user.

<a name='P-SocialMediaAPP-Models-User-BirthDate'></a>
### BirthDate `property`

##### Summary

The birthdate of the user.
This field is optional and may be used for age-related features.

<a name='P-SocialMediaAPP-Models-User-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The date and time when the user account was created.
This field is optional.

<a name='P-SocialMediaAPP-Models-User-Email'></a>
### Email `property`

##### Summary

The email address of the user.
This field is optional and may be used for communication and login purposes.

<a name='P-SocialMediaAPP-Models-User-FirstName'></a>
### FirstName `property`

##### Summary

The first name of the user.
This field is optional.

<a name='P-SocialMediaAPP-Models-User-LastName'></a>
### LastName `property`

##### Summary

The last name of the user.
This field is optional.

<a name='P-SocialMediaAPP-Models-User-Password'></a>
### Password `property`

##### Summary

The password of the user, used for authentication.
This field is optional and should be securely stored.

<a name='P-SocialMediaAPP-Models-User-Username'></a>
### Username `property`

##### Summary

The username of the user, which can be used for login or display purposes.
This field is optional.

<a name='T-SocialMediaAPP-Controllers-UserController'></a>
## UserController `type`

##### Namespace

SocialMediaAPP.Controllers

##### Summary

API Controller for managing users in the social media application.
Provides CRUD operations, image management, and pagination functionalities for users.

<a name='M-SocialMediaAPP-Controllers-UserController-Delete-System-Int32-'></a>
### Delete(id) `method`

##### Summary

Deletes a user by ID if the user has no posts, comments, or followers.
Also deletes the corresponding Operator record.

##### Returns

A status code indicating success or failure.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user to delete. |

<a name='M-SocialMediaAPP-Controllers-UserController-Generate-System-Int32-'></a>
### Generate(amount) `method`

##### Summary

Generates a specified number of random user accounts with randomized creation dates from the last 30 days.

##### Returns

A success message and a list of the generated users with their details, or a \`400 Bad Request\` if the amount is invalid.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| amount | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The number of users to generate (between 1 and 500). |

<a name='M-SocialMediaAPP-Controllers-UserController-Get'></a>
### Get() `method`

##### Summary

Retrieves all users from the database.

##### Returns

A list of UserDTORead objects representing all users.

##### Parameters

This method has no parameters.

<a name='M-SocialMediaAPP-Controllers-UserController-GetById-System-Int32-'></a>
### GetById(id) `method`

##### Summary

Retrieves a specific user by ID.

##### Returns

A UserDTORead object representing the user if found.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user to retrieve. |

<a name='M-SocialMediaAPP-Controllers-UserController-Pagination-System-Int32,System-String-'></a>
### Pagination(page,condition) `method`

##### Summary

Retrieves paginated users based on the page number and optional search condition.
Allows filtering by username, first name, or last name.

##### Returns

A paginated list of users matching the condition.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| page | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The page number to retrieve. (Starting from 1) |
| condition | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | Optional search condition to filter users by name or username. |

<a name='M-SocialMediaAPP-Controllers-UserController-Post-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-'></a>
### Post(dto) `method`

##### Summary

Creates a new user in the system and also creates a corresponding operator record.
Checks if the user with the same email or username already exists.

##### Returns

A status code indicating success or failure.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| dto | [SocialMediaAPP.Models.DTO.UserDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate') | The UserDTOInsertUpdate object containing user details for the new user. |

<a name='M-SocialMediaAPP-Controllers-UserController-Put-System-Int32,SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-'></a>
### Put(id,dto) `method`

##### Summary

Updates an existing user by ID and updates or creates the corresponding operator record if applicable.
Checks if the email or username already exists for another user.

##### Returns

A status code indicating success or failure.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user to update. |
| dto | [SocialMediaAPP.Models.DTO.UserDTOInsertUpdate](#T-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate 'SocialMediaAPP.Models.DTO.UserDTOInsertUpdate') | The UserDTOInsertUpdate object containing updated user details. |

<a name='M-SocialMediaAPP-Controllers-UserController-SetImage-System-Int32,SocialMediaAPP-Models-DTO-ImageDTO-'></a>
### SetImage(id,image) `method`

##### Summary

Updates the profile image of a user by their ID.

##### Returns

A status code indicating success or failure.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| id | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user to update the image for. |
| image | [SocialMediaAPP.Models.DTO.ImageDTO](#T-SocialMediaAPP-Models-DTO-ImageDTO 'SocialMediaAPP.Models.DTO.ImageDTO') | The ImageDTO containing the Base64 encoded image. |

<a name='T-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate'></a>
## UserDTOInsertUpdate `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for inserting or updating a user.
Contains the necessary fields for creating or updating user information, including username, password, 
email, and date of birth. Optional fields include the first and last name.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Username | [T:SocialMediaAPP.Models.DTO.UserDTOInsertUpdate](#T-T-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate 'T:SocialMediaAPP.Models.DTO.UserDTOInsertUpdate') | The unique username of the user. This field is required. |

<a name='M-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-#ctor-System-String,System-String,System-String,System-String,System-String,System-DateTime,System-DateTime-'></a>
### #ctor(Username,Password,Email,FirstName,LastName,BirthDate,CreatedAt) `constructor`

##### Summary

Data Transfer Object (DTO) for inserting or updating a user.
Contains the necessary fields for creating or updating user information, including username, password, 
email, and date of birth. Optional fields include the first and last name.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| Username | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The unique username of the user. This field is required. |
| Password | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The password of the user. This field is required. |
| Email | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The email address of the user. This field is required and must be in a valid email format. |
| FirstName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The first name of the user. This field is required. |
| LastName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The last name of the user. This field is required. |
| BirthDate | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The date of birth of the user. This field is required and must pass the custom age validation, ensuring the user is at least 10 years old. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the user account was created. This field is required. |

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-BirthDate'></a>
### BirthDate `property`

##### Summary

The date of birth of the user. This field is required and must pass the custom age validation, ensuring the user is at least 10 years old.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the user account was created. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Email'></a>
### Email `property`

##### Summary

The email address of the user. This field is required and must be in a valid email format.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-FirstName'></a>
### FirstName `property`

##### Summary

The first name of the user. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-LastName'></a>
### LastName `property`

##### Summary

The last name of the user. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Password'></a>
### Password `property`

##### Summary

The password of the user. This field is required.

<a name='P-SocialMediaAPP-Models-DTO-UserDTOInsertUpdate-Username'></a>
### Username `property`

##### Summary

The unique username of the user. This field is required.

<a name='T-SocialMediaAPP-Models-DTO-UserDTORead'></a>
## UserDTORead `type`

##### Namespace

SocialMediaAPP.Models.DTO

##### Summary

Data Transfer Object (DTO) for reading user information.
Represents the structure of user data as it is returned from the API, including details like the username, email,
names, birth date, profile image, and creation timestamp.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [T:SocialMediaAPP.Models.DTO.UserDTORead](#T-T-SocialMediaAPP-Models-DTO-UserDTORead 'T:SocialMediaAPP.Models.DTO.UserDTORead') | The unique identifier of the user. |

<a name='M-SocialMediaAPP-Models-DTO-UserDTORead-#ctor-System-Int32,System-String,System-String,System-String,System-String,System-DateTime,System-DateTime,System-String-'></a>
### #ctor(ID,Username,Email,FirstName,LastName,BirthDate,CreatedAt,Image) `constructor`

##### Summary

Data Transfer Object (DTO) for reading user information.
Represents the structure of user data as it is returned from the API, including details like the username, email,
names, birth date, profile image, and creation timestamp.

##### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| ID | [System.Int32](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.Int32 'System.Int32') | The unique identifier of the user. |
| Username | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The username of the user. |
| Email | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The email address of the user. |
| FirstName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The first name of the user. |
| LastName | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The last name of the user. |
| BirthDate | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The date of birth of the user. |
| CreatedAt | [System.DateTime](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.DateTime 'System.DateTime') | The timestamp indicating when the user was created. |
| Image | [System.String](http://msdn.microsoft.com/query/dev14.query?appId=Dev14IDEF1&l=EN-US&k=k:System.String 'System.String') | The path or URL to the user's profile image. This field is optional. |

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-BirthDate'></a>
### BirthDate `property`

##### Summary

The date of birth of the user.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-CreatedAt'></a>
### CreatedAt `property`

##### Summary

The timestamp indicating when the user was created.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-Email'></a>
### Email `property`

##### Summary

The email address of the user.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-FirstName'></a>
### FirstName `property`

##### Summary

The first name of the user.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-ID'></a>
### ID `property`

##### Summary

The unique identifier of the user.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-Image'></a>
### Image `property`

##### Summary

The path or URL to the user's profile image. This field is optional.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-LastName'></a>
### LastName `property`

##### Summary

The last name of the user.

<a name='P-SocialMediaAPP-Models-DTO-UserDTORead-Username'></a>
### Username `property`

##### Summary

The username of the user.
